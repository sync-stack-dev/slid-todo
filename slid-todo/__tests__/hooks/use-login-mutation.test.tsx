import { useLoginMutation } from "@/hooks/auth/use-login-mutation";
import { instance } from "@/lib/axios";
import { expect } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLoginStore } from "@/stores/use-login-store";

const queryClient = new QueryClient(); 
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const requestData = { email: "dummy email", password: "dummy password" };
const response = {
  data: {
    accessToken: "dummy access token",
    refreshToken: "dummy refresh token",
  },
};

jest.mock("@/lib/axios");

it("test", async () => {
  const mockPost = jest.fn().mockResolvedValue(response);
  instance.post = mockPost;

  const { result } = renderHook(() => useLoginMutation(), { wrapper });
  const { mutate: login } = result.current;
  const onSuccessMock = jest.fn();
  const onErrorMock = jest.fn();

  await login(requestData, {
    onSuccess: onSuccessMock,
    onError: onErrorMock,
  });

  await waitFor(() => {
    const { status, isError, error } = result.current;
    expect(mockPost).toBeCalledWith("/auth/login", requestData);
    expect(status).toBe("success");
    expect(isError).toBe(false);
    expect(error).toBe(null);
    expect(onSuccessMock).toBeCalledTimes(1);
    expect(onErrorMock).toBeCalledTimes(0);
    expect(useLoginStore.getState().accessToken).toBe(response.data.accessToken);
    expect(useLoginStore.getState().refreshToken).toBe(response.data.refreshToken);
  });
});
