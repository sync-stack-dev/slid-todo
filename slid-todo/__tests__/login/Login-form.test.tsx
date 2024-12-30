/* ------성공테스트-------------- */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect } from "@jest/globals";
import LoginComponent from "@/app/(routes)/(auth)/login/components/Login-form";
import { instance } from "@/lib/axios";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
  useSearchParams() {
    return {
      get: jest.fn().mockReturnValue("dummy@email.com"),
    };
  },
}));

jest.mock("@/lib/axios");

// QueryClient 설정
const queryClient = new QueryClient();
const response = {
  data: {
    accessToken: "dummy access token",
    refreshToken: "dummy refresh token",
  },
};

describe("LoginComponent", () => {
  // **UI 렌더링 확인 테스트**
  it("renders the login form correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginComponent />
      </QueryClientProvider>,
    );

    // 이메일 입력 필드 렌더링 확인
    expect(screen.getByPlaceholderText("이메일을 입력해 주세요")).toBeInTheDocument();

    // 비밀번호 입력 필드 렌더링 확인
    expect(screen.getByPlaceholderText("비밀번호를 입력해 주세요")).toBeInTheDocument();

    // 로그인 버튼 렌더링 확인
    expect(screen.getByText("로그인하기")).toBeInTheDocument();
  });

  // **로그인 요청 트리거 확인 테스트**
  it("should trigger the login mutation when the button is clicked", async () => {
    const mockPost = jest.fn().mockResolvedValue(response);
    instance.post = mockPost;

    render(
      <QueryClientProvider client={queryClient}>
        <LoginComponent />
      </QueryClientProvider>,
    );

    // 입력 필드에 값 입력
    const emailInput = screen.getByPlaceholderText("이메일을 입력해 주세요");
    fireEvent.change(emailInput, { target: { value: "dummy@email.com" } });

    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해 주세요");
    fireEvent.change(passwordInput, { target: { value: "dummypassword" } });

    const button = screen.getByText("로그인하기");
    expect(button).toBeEnabled();
    fireEvent.click(button);

    // mutate 함수가 호출되었는지 확인
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/auth/login", {
        email: "dummy@email.com",
        password: "dummypassword",
      });
    });
  });
});
