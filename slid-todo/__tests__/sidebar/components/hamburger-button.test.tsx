import { screen, fireEvent } from "@testing-library/react";
import { HamburgerButton } from "@/components/shared/app-sidebar/components/hamburger-button";
import { renderWithProviders } from "../../data/test-utils";
import { expect } from "@jest/globals";
const mockSetOpenMobile = jest.fn();

jest.mock("@/components/ui/sidebar", () => ({
  useSidebar: () => ({
    setOpenMobile: mockSetOpenMobile,
  }),
}));

jest.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon" />,
}));

describe("HamburgerButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("버튼이 올바른 aria-label을 가져야 함", () => {
    renderWithProviders(<HamburgerButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "expand sidebar menu");
  });

  it("클릭 시 setOpenMobile이 true로 호출되어야 함", () => {
    renderWithProviders(<HamburgerButton />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetOpenMobile).toHaveBeenCalledWith(true);
  });

  it("버튼과 아이콘이 올바른 크기를 가져야 함", () => {
    renderWithProviders(<HamburgerButton />);

    const button = screen.getByRole("button");
    const icon = screen.getByTestId("menu-icon");
    const iconWrapper = icon.parentElement;

    expect(button).toHaveClass("w-[24px]", "h-[24px]");
    expect(iconWrapper).toHaveClass("w-[24px]", "h-[24px]");
  });

  it("버튼이 transition 효과를 가져야 함", () => {
    renderWithProviders(<HamburgerButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-transform", "duration-200", "hover:scale-105");
  });
});
