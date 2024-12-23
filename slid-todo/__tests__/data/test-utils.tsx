import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/providers/toast-provider";
import { Providers as ThemeProvider } from "@/providers/theme-provider";
import { render } from "@testing-library/react";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const TestWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = createTestQueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
          <ToastProvider />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export function getByCy(container: HTMLElement, cy: string) {
  return container.querySelector(`[data-cy="${cy}"]`);
}

export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: TestWrapper });
}
