import { screen } from "@testing-library/react";
import AppSidebarDashBoard from "@/components/shared/app-sidebar/components/app-sidebar-dashboard";
import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";

// useUserQuery hook mock
const mockUseUserQuery = jest.fn();
jest.mock("@/stores/use-user-store", () => ({
  useUserQuery: () => mockUseUserQuery(),
}));

describe("AppSidebarDashBoard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("로딩 상태", () => {
    it("로딩 중일 때 Skeleton이 표시되어야 함", () => {
      mockUseUserQuery.mockReturnValue({ isLoading: true });
      renderWithProviders(<AppSidebarDashBoard />);

      const skeletons = screen.getAllByTestId("skeleton");
      expect(skeletons).toHaveLength(2);

      expect(skeletons[0]).toHaveClass("w-[16px]", "h-[16px]", "rounded-xl", "mr-3");
      expect(skeletons[1]).toHaveClass("w-24", "h-[22px]", "rounded-xl");
    });
  });

  describe("로딩 완료 상태", () => {
    beforeEach(() => {
      mockUseUserQuery.mockReturnValue({ isLoading: false });
    });

    it("대시보드 링크가 올바른 href를 가져야 함", () => {
      renderWithProviders(<AppSidebarDashBoard />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/dashboard");
    });

    it("House 아이콘이 렌더링되어야 함", () => {
      renderWithProviders(<AppSidebarDashBoard />);
      const icon = screen.getByTestId("house-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("w-[16px]", "h-[16px]", "mr-3");
    });

    it("대시보드 텍스트가 표시되어야 함", () => {
      renderWithProviders(<AppSidebarDashBoard />);
      expect(screen.getByText("대시보드")).toBeInTheDocument();
    });

    it("다크 모드 스타일이 적용되어야 함", () => {
      renderWithProviders(<AppSidebarDashBoard />);
      const container = screen.getByText("대시보드").parentElement;
      expect(container).toHaveClass("dark:text-white", "dark:hover:text-blue-400");
    });
  });
});
