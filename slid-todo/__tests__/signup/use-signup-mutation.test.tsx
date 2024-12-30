import { useSignupMutation } from "@/hooks/auth/use-signup-mutation";
import { instance } from "@/lib/axios";
import { expect } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const requestData = {
  name: "dummy",
  email: "dummy email",
  password: "dummy password",
};

const response = {
  data: {
    id: 0,
    email: "dummy email",
    name: "dummy",
    createdAt: "2024-12-16T01:00:38.368Z",
    updatedAt: "2024-12-16T01:00:38.368Z",
  },
};

jest.mock("@/lib/axios");

it("signup test", async () => {
  const mockPost = jest.fn().mockResolvedValue(response);
  instance.post = mockPost;

  const { result } = renderHook(() => useSignupMutation(), { wrapper });
  const { mutate: Signup } = result.current;
  const onSuccessMock = jest.fn();
  const onErrorMock = jest.fn();

  await Signup(requestData, {
    onSuccess: onSuccessMock,
    onError: onErrorMock,
  });

  await waitFor(() => {
    const { status, isError, error } = result.current;
    expect(mockPost).toBeCalledWith("/user", requestData);
    expect(status).toBe("success");
    expect(isError).toBe(false);
    expect(error).toBe(null);
    expect(onSuccessMock).toBeCalledTimes(1);
    expect(onErrorMock).toBeCalledTimes(0);
  });
});
