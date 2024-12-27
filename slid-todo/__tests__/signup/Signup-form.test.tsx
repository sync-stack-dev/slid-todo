import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect } from "@jest/globals";
import SignupComponent from "@/app/(routes)/(auth)/signup/components/Signup-form";
import { instance } from "@/lib/axios";
import { useRouter } from "next/router";

// next/navigation을 mock 처리
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/login",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

// axios 요청을 mock 처리
jest.mock("@/lib/axios");

const queryClient = new QueryClient();
const response = {
  data: {
    id: 0,
    email: "dummy@email.com",
    name: "dummy",
    createdAt: "2024-12-16T01:00:38.368Z",
    updatedAt: "2024-12-16T01:00:38.368Z",
  },
};

describe("SignupComponent", () => {
  it("renders the signup form correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignupComponent />
      </QueryClientProvider>,
    );
    // 이름 입력 필드 렌더링 확인
    expect(screen.getByPlaceholderText("이름을 입력해 주세요")).toBeInTheDocument();
    // 이메일 입력 필드 렌더링 확인
    expect(screen.getByPlaceholderText("이메일을 입력해 주세요")).toBeInTheDocument();
    // 비밀번호 입력 필드 렌더링 확인
    expect(screen.getByPlaceholderText("비밀번호를 입력해 주세요")).toBeInTheDocument();
    // 비밀번호 확인 입력 필드 렌더링 확인
    expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument();
  });

  it("should trigger the signup mutation when the button is clicked", async () => {
    const mockPost = jest.fn().mockResolvedValue(response);
    instance.post = mockPost;

    render(
      <QueryClientProvider client={queryClient}>
        <SignupComponent />
      </QueryClientProvider>,
    );

    // 폼 입력 값 변경
    const nameInput = screen.getByPlaceholderText("이름을 입력해 주세요");
    fireEvent.change(nameInput, { target: { value: "dummy" } });

    const emailInput = screen.getByPlaceholderText("이메일을 입력해 주세요");
    fireEvent.change(emailInput, { target: { value: "dummy@email.com" } });

    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해 주세요");
    fireEvent.change(passwordInput, { target: { value: "dummypassword" } });

    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");
    fireEvent.change(confirmPasswordInput, { target: { value: "dummypassword" } });

    const button = screen.getByText("회원가입하기");
    expect(button).toBeEnabled();
    fireEvent.click(button);

    // API 요청 경로와 데이터가 올바른지 확인
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/user", {
        name: "dummy",
        email: "dummy@email.com",
        password: "dummypassword",
        confirmPassword: "dummypassword",
      });
    });
  });
});
