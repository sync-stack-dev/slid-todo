import { screen } from "@testing-library/react";
import { AppSidebarHeader } from "@/components/shared/app-sidebar/components/app-sidebar-header";
import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";

// useUserQuery hook mock
const mockUseUserQuery = jest.fn();
jest.mock("@/stores/use-user-store", () => ({
  useUserQuery: () => mockUseUserQuery(),
}));

// CollapseButton mock
jest.mock("@/components/shared/app-sidebar/components/collapse-button", () => ({
  CollapseButton: () => <button data-testid="collapse-button">Collapse</button>,
}));

describe("AppSidebarHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("로딩 상태", () => {
    it("로딩 중일 때 Skeleton이 표시되어야 함", () => {
      mockUseUserQuery.mockReturnValue({ isLoading: true });
      renderWithProviders(<AppSidebarHeader />);

      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("w-[132px]", "h-[43px]", "rounded-xl");
    });

    it("로딩 중에도 CollapseButton이 표시되어야 함", () => {
      mockUseUserQuery.mockReturnValue({ isLoading: true });
      renderWithProviders(<AppSidebarHeader />);

      expect(screen.getByTestId("collapse-button")).toBeInTheDocument();
    });

    it("로딩 중에도 대시보드 링크가 작동해야 함", () => {
      mockUseUserQuery.mockReturnValue({ isLoading: true });
      renderWithProviders(<AppSidebarHeader />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/dashboard");
    });
  });

  describe("로딩 완료 상태", () => {
    beforeEach(() => {
      mockUseUserQuery.mockReturnValue({ isLoading: false });
    });

    it("대시보드 링크가 올바른 aria-label을 가져야 함", () => {
      renderWithProviders(<AppSidebarHeader />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/dashboard");
      expect(link).toHaveAttribute("aria-label", "Go to dashboard");
    });

    it("스크린 리더용 텍스트가 있어야 함", () => {
      renderWithProviders(<AppSidebarHeader />);

      const srText = screen.getAllByText("Dashboard home");
      expect(srText).toHaveLength(2);
      srText.forEach((text) => {
        expect(text).toHaveClass("sr-only");
      });
    });

    it("CollapseButton이 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarHeader />);

      expect(screen.getByTestId("collapse-button")).toBeInTheDocument();
    });
  });

  describe("레이아웃", () => {
    it("헤더가 올바른 레이아웃 클래스를 가져야 함", () => {
      mockUseUserQuery.mockReturnValue({ isLoading: false });
      renderWithProviders(<AppSidebarHeader />);

      const header = screen.getByRole("link").parentElement;
      expect(header).toHaveClass("flex", "justify-between", "items-center", "px-2", "py-2");
    });
  });
});
