import { screen, fireEvent } from "@testing-library/react";
import { CollapseButton } from "@/components/shared/app-sidebar/components/collapse-button";
import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";
const mockSetOpen = jest.fn();
const mockSetOpenMobile = jest.fn();

jest.mock("@/components/ui/sidebar", () => ({
  useSidebar: () => ({
    setOpen: mockSetOpen,
    setOpenMobile: mockSetOpenMobile,
  }),
}));

jest.mock("lucide-react", () => ({
  ChevronsLeftIcon: () => <div data-testid="chevrons-left-icon" />,
}));

describe("CollapseButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("버튼이 올바른 aria-label을 가져야 함", () => {
    renderWithProviders(<CollapseButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "collapse sidebar menu");
  });

  it("버튼이 올바른 스타일 클래스를 가져야 함", () => {
    renderWithProviders(<CollapseButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "p-[12px]",
      "w-[24px]",
      "h-[24px]",
      "border-2",
      "border-gray-400",
      "hover:bg-gray-300",
      "rounded-[8px]",
      "transition-transform",
      "duration-200",
      "hover:scale-105",
    );
  });

  it("클릭 시 setOpen과 setOpenMobile이 false로 호출되어야 함", () => {
    renderWithProviders(<CollapseButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(mockSetOpenMobile).toHaveBeenCalledWith(false);
  });
});
