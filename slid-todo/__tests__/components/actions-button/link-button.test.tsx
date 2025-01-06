import { renderWithProviders } from "../../data/test-utils";
import { screen } from "@testing-library/react";
import { LinkButton } from "@/components/shared/action-buttons/link-button";
import { expect } from "@jest/globals";

describe("LinkButton", () => {
  const testUrl = "example.com";

  it("링크가 올바르게 렌더링된다", () => {
    renderWithProviders(<LinkButton url={testUrl} />);

    const link = screen.getByRole("link", { name: "Open external link" });
    expect(link).toBeInTheDocument();
  });

  it("URL에 https가 없으면 자동으로 추가된다", () => {
    renderWithProviders(<LinkButton url={testUrl} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `https://${testUrl}`);
  });

  it("URL에 이미 https가 있으면 그대로 유지된다", () => {
    const httpsUrl = "https://example.com";
    renderWithProviders(<LinkButton url={httpsUrl} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", httpsUrl);
  });

  it("URL에 http가 있으면 그대로 유지된다", () => {
    const httpUrl = "http://example.com";
    renderWithProviders(<LinkButton url={httpUrl} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", httpUrl);
  });

  it("링크가 새 탭에서 열리도록 설정되어 있다", () => {
    renderWithProviders(<LinkButton url={testUrl} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("링크에 올바른 스타일이 적용된다", () => {
    renderWithProviders(<LinkButton url={testUrl} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "p-1",
      "hover:bg-gray-100",
      "dark:hover:bg-slate-600",
      "rounded-full",
      "w-8",
      "h-8",
    );
  });

  describe("접근성", () => {
    it("링크에 적절한 aria-label이 있다", () => {
      renderWithProviders(<LinkButton url={testUrl} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Open external link");
    });
  });

  it("data-cy 속성이 올바르게 설정된다", () => {
    renderWithProviders(<LinkButton url={testUrl} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("data-cy", "link-button");
  });
});
