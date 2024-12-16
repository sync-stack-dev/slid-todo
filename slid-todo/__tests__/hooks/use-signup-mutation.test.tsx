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
  chkPassword: "dummy password",
};
const response = {
  data: {
    id: "0",
    email: "dummy access token",
    name: "dummy refresh token",
    createdAt: "2024-12-16T01:00:38.368Z",
    updatedAt: "2024-12-16T01:00:38.368Z",
  },
};
