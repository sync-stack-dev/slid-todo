import { screen, fireEvent } from "@testing-library/react";
import { ExpandButton } from "@/components/shared/app-sidebar/components/expand-button";
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

// Mock ChevronsRightIcon
jest.mock("lucide-react", () => ({
  ChevronsRightIcon: () => <div data-testid="chevrons-right-icon" />,
}));

describe("ExpandButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("버튼이 올바른 aria-label을 가져야 함", () => {
    renderWithProviders(<ExpandButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "expand sidebar menu");
  });

  it("버튼이 올바른 스타일 클래스를 가져야 함", () => {
    renderWithProviders(<ExpandButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "p-[12px]",
      "w-[24px]",
      "h-[24px]",
      "border-2",
      "border-gray-500",
      "hover:bg-gray-100",
      "rounded-[8px]",
      "transition-transform",
      "duration-200",
      "hover:scale-105",
    );
  });

  it("클릭 시 setOpen과 setOpenMobile이 true로 호출되어야 함", () => {
    renderWithProviders(<ExpandButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetOpen).toHaveBeenCalledWith(true);
    expect(mockSetOpenMobile).toHaveBeenCalledWith(true);
  });
});
