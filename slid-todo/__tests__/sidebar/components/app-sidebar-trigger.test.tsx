import { screen } from "@testing-library/react";
import { AppSidebarTrigger } from "@/components/shared/app-sidebar/components/app-sidebar-trigger";
import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";

const mockUseSidebar = jest.fn();
jest.mock("@/components/ui/sidebar", () => ({
  useSidebar: () => mockUseSidebar(),
}));

jest.mock("@/components/shared/app-sidebar/components/hamburger-button", () => ({
  HamburgerButton: () => <button data-testid="hamburger-button">Menu</button>,
}));

jest.mock("@/components/shared/app-sidebar/components/expand-button", () => ({
  ExpandButton: () => <button data-testid="expand-button">Expand</button>,
}));

jest.mock("@/components/shared/app-logo/app-logo", () => ({
  __esModule: true,
  default: () => <div data-testid="app-logo">Logo</div>,
}));

describe("AppSidebarTrigger", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("모바일 뷰", () => {
    beforeEach(() => {
      mockUseSidebar.mockReturnValue({ isMobile: true });
    });

    it("모바일에서 HamburgerButton이 표시되어야 함", () => {
      renderWithProviders(<AppSidebarTrigger />);

      expect(screen.getByTestId("hamburger-button")).toBeInTheDocument();
    });

    it("모바일 헤더가 올바른 스타일을 가져야 함", () => {
      renderWithProviders(<AppSidebarTrigger />);

      const mobileHeader = screen.getByTestId("hamburger-button").parentElement;
      expect(mobileHeader).toHaveClass(
        "fixed",
        "z-50",
        "h-[2rem]",
        "w-full",
        "flex",
        "items-center",
        "bg-white",
        "dark:bg-blue-950",
      );
    });
  });

  describe("데스크톱 뷰", () => {
    beforeEach(() => {
      mockUseSidebar.mockReturnValue({ isMobile: false });
    });

    it("데스크톱에서 HamburgerButton이 숨겨져야 함", () => {
      renderWithProviders(<AppSidebarTrigger />);

      const hamburgerButton = screen.queryByTestId("hamburger-button");
      expect(hamburgerButton).not.toBeInTheDocument();
    });

    it("AppLogo가 올바른 스타일로 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarTrigger />);

      const logoContainer = screen.getByTestId("app-logo").parentElement;
      expect(logoContainer).toHaveClass("mb-5", "w-[32px]", "h-[32px]", "bg-blue-600", "text-sm");
    });

    it("ExpandButton이 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarTrigger />);

      expect(screen.getByTestId("expand-button")).toBeInTheDocument();
    });
  });
});
