import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLoginMutation } from "@/hooks/auth/use-login-mutation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect } from "@jest/globals";
import { useLoginStore } from "@/stores/use-login-store";
import { instance } from "@/lib/axios";
import axios from "axios";
// QueryClient 설정
const queryClient = new QueryClient();

// useLoginMutation 훅 모킹
jest.mock("@/lib/axios");
jest.mock("@/stores/use-login-store");
jest.mock("axios");

// 로그인 컴포넌트 예시
const LoginComponent = () => {
  const { mutate: login, status, isError, error } = useLoginMutation();

  const handleSubmit = async () => {
    const data = { email: "test@example.com", password: "password123" };
    try {
      await login(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={status === "pending"}>
        {status === "pending" ? "Logging In..." : "Log In"}
      </button>
      {isError && <span>{error?.message}</span>}
    </div>
  );
};

describe("LoginComponent", () => {
  it("should trigger the login mutation when the button is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LoginComponent />
      </QueryClientProvider>,
    );

    const button = screen.getByText("Log In");
    fireEvent.click(button);

    // mutate 함수가 호출되었는지 확인
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it("should display an error message when login fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const mockError = new Error("로그인 중 오류가 발생했습니다.");
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn().mockRejectedValue(mockError),
      status: "idle",
      isError: true,
      error: mockError,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <LoginComponent />
      </QueryClientProvider>,
    );

    const button = screen.getByText("Log In");
    fireEvent.click(button);

    await waitFor(() => {
      // 오류 메시지가 화면에 표시되는지 확인
      expect(screen.getByText("로그인 중 오류가 발생했습니다.")).toBeInTheDocument();
    });
    console.error.mockRestore();
  });

  it("should show loading state when submitting", () => {
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: "loading",
      isError: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <LoginComponent />
      </QueryClientProvider>,
    );

    const button = screen.getByText("Logging In...");
    expect(button).toBeDisabled();
  });
});
