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
  it("should trigger the login mutation when the button is clicked", async () => {
    const mockPost = jest.fn().mockResolvedValue(response);
    instance.post = mockPost;
    render(
      <QueryClientProvider client={queryClient}>
        <LoginComponent />
      </QueryClientProvider>,
    );

    const emailInput = screen.getByPlaceholderText("이메일을 입력해 주세요");
    fireEvent.change(emailInput, { value: "dummy@email.com" });
    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해 주세요");
    fireEvent.change(passwordInput, { value: "dummypassword" });

    const button = screen.getByText("로그인하기");
    expect(button).toBeEnabled();
    fireEvent.click(button);

    // mutate 함수가 호출되었는지 확인
    // expect(mockLogin).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      // expect(screen.getByText("로그인 성공!")).toBeInTheDocument();
      expect(mockPost).toBeCalledTimes(1);
    });
  });

  // it("should display an error message when login fails", async () => {
  //   jest.spyOn(console, "error").mockImplementation(() => {});
  //   const mockError = new Error("로그인 중 오류가 발생했습니다.");
  //   (useLoginMutation as jest.Mock).mockReturnValue({
  //     mutate: jest.fn().mockRejectedValue(mockError),
  //     status: "idle",
  //     isError: true,
  //     error: mockError,
  //   });

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <LoginComponent />
  //     </QueryClientProvider>,
  //   );

  //   const button = screen.getByText("Log In");
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     // 오류 메시지가 화면에 표시되는지 확인
  //     expect(screen.getByText("로그인 중 오류가 발생했습니다.")).toBeInTheDocument();
  //   });
  //   console.error.mockRestore();
  // });

  // it("should show loading state when submitting", () => {
  //   (useLoginMutation as jest.Mock).mockReturnValue({
  //     mutate: jest.fn(),
  //     status: "loading",
  //     isError: false,
  //     error: null,
  //   });

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <LoginComponent />
  //     </QueryClientProvider>,
  //   );

  //   const button = screen.getByText("Logging In...");
  //   expect(button).toBeDisabled();
  // });
});
