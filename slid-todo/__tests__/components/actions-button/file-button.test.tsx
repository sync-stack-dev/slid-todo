import { renderWithProviders } from "../../data/test-utils";
import { screen } from "@testing-library/react";
import { FileButton } from "@/components/shared/action-buttons/file-button";
import { expect } from "@jest/globals";

describe("FileButton", () => {
  const testUrl = "https://example.com/files/test-document.pdf";
  const simpleUrl = "example.com/test-file.pdf";

  it("버튼이 올바르게 렌더링된다", () => {
    renderWithProviders(<FileButton url={testUrl} />);

    const button = screen.getByRole("button", { name: "file-button" });
    expect(button).toBeInTheDocument();
  });

  it("링크가 올바르게 렌더링된다", () => {
    renderWithProviders(<FileButton url={testUrl} />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("아이콘이 올바르게 렌더링된다", () => {
    renderWithProviders(<FileButton url={testUrl} />);

    const icon = screen.getByLabelText("file-button-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-blue-400");
  });

  describe("URL 처리", () => {
    it("URL에 https가 없으면 자동으로 추가된다", () => {
      renderWithProviders(<FileButton url={simpleUrl} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", `https://${simpleUrl}`);
    });

    it("URL에 이미 https가 있으면 그대로 유지된다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", testUrl);
    });
  });

  describe("파일 다운로드 설정", () => {
    it("URL에서 파일 이름을 추출하여 download 속성에 설정한다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("download", "test-document.pdf");
    });

    it("URL에 파일 이름이 없으면 기본값 'download'를 사용한다", () => {
      renderWithProviders(<FileButton url="https://example.com/" />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("download", "download");
    });
  });

  describe("스타일링", () => {
    it("버튼에 올바른 스타일이 적용된다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "p-1",
        "hover:bg-gray-100",
        "dark:hover:bg-slate-600",
        "rounded-full",
        "aspect-square",
        "w-8",
        "h-8",
      );
    });

    it("링크에 올바른 크기가 적용된다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const link = screen.getByRole("link");
      expect(link).toHaveClass("w-4", "h-4");
    });
  });

  describe("접근성", () => {
    it("버튼에 title 속성이 URL로 설정된다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", testUrl);
    });

    it("버튼에 적절한 aria-label이 있다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "file-button");
    });

    it("아이콘에 적절한 aria-label이 있다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const icon = screen.getByLabelText("file-button-icon");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("보안", () => {
    it("링크가 새 탭에서 안전하게 열리도록 설정되어 있다", () => {
      renderWithProviders(<FileButton url={testUrl} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("data-cy 속성이 올바르게 설정된다", () => {
    renderWithProviders(<FileButton url={testUrl} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("data-cy", "file-button");
  });
});
