import { renderWithProviders } from "../../data/test-utils";
import { screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import EmbedContent from "@/components/shared/note-viewer/embed-content";
import { useMediaQuery } from "@/hooks/use-media-query";

jest.mock("@/hooks/use-media-query");
const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

describe("EmbedContent", () => {
  const youtubeUrl = "https://www.youtube.com/watch?v=test123";
  const youtubeShortUrl = "https://youtu.be/test123";
  const vimeoUrl = "https://vimeo.com/123456789";
  const regularUrl = "https://example.com";

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMediaQuery.mockReturnValue(true);
  });

  describe("YouTube 임베딩", () => {
    it("YouTube URL을 올바른 임베드 URL로 변환한다", () => {
      renderWithProviders(<EmbedContent url={youtubeUrl} isVisible={true} />);

      const iframe = screen.getByTitle("Embed Content");
      expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/test123");
    });

    it("YouTube 짧은 URL을 올바른 임베드 URL로 변환한다", () => {
      renderWithProviders(<EmbedContent url={youtubeShortUrl} isVisible={true} />);

      const iframe = screen.getByTitle("Embed Content");
      expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/test123");
    });
  });

  describe("Vimeo 임베딩", () => {
    it("Vimeo URL을 올바른 임베드 URL로 변환한다", () => {
      renderWithProviders(<EmbedContent url={vimeoUrl} isVisible={true} />);

      const iframe = screen.getByTitle("Embed Content");
      expect(iframe).toHaveAttribute("src", "https://player.vimeo.com/video/123456789");
    });
  });

  describe("지원하지 않는 URL", () => {
    it("지원하지 않는 URL에 대해 안내 메시지를 표시한다", () => {
      renderWithProviders(<EmbedContent url={regularUrl} isVisible={true} />);

      expect(screen.getByText("미리보기를 지원하지 않는 링크입니다")).toBeInTheDocument();
      expect(screen.getByText("example.com")).toBeInTheDocument();
    });
  });

  describe("반응형 동작", () => {
    it("작은 화면에서는 심플 모드로 렌더링된다", () => {
      mockUseMediaQuery.mockReturnValue(false);
      renderWithProviders(<EmbedContent url={youtubeUrl} isVisible={true} />);

      const container = screen.getByTitle("Embed Content").closest("div");
      expect(container).toHaveClass("w-full", "aspect-video");
    });

    it("큰 화면에서는 전체 모드로 렌더링된다", () => {
      mockUseMediaQuery.mockReturnValue(true);
      renderWithProviders(<EmbedContent url={youtubeUrl} isVisible={true} />);

      const container = screen.getByTitle("Embed Content").closest("div");
      expect(container).toHaveClass("w-full", "max-w-3xl", "aspect-video");
    });
  });

  describe("simpleMode", () => {
    it("simpleMode가 true이면 심플 모드로 렌더링된다", () => {
      renderWithProviders(<EmbedContent url={youtubeUrl} isVisible={true} simpleMode={true} />);

      const container = screen.getByTitle("Embed Content").closest("div");
      expect(container).toHaveClass("w-full", "aspect-video");
    });
  });

  describe("접근성", () => {
    it("iframe에 적절한 title이 있다", () => {
      renderWithProviders(<EmbedContent url={youtubeUrl} isVisible={true} />);

      expect(screen.getByTitle("Embed Content")).toBeInTheDocument();
    });

    it("iframe에 필요한 속성들이 있다", () => {
      renderWithProviders(<EmbedContent url={youtubeUrl} isVisible={true} />);

      const iframe = screen.getByTitle("Embed Content");
      expect(iframe).toHaveAttribute("allowFullScreen");
      expect(iframe).toHaveAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      );
    });
  });

  describe("에러 처리", () => {
    it("잘못된 URL 형식에 대해 gracefully하게 처리한다", () => {
      renderWithProviders(<EmbedContent url="invalid-url" isVisible={true} />);

      expect(screen.getByText("미리보기를 지원하지 않는 링크입니다")).toBeInTheDocument();
    });
  });

  describe("스타일링", () => {
    it("custom className이 적용된다", () => {
      renderWithProviders(
        <EmbedContent url={youtubeUrl} isVisible={true} className="custom-class" />,
      );

      const container = screen.getByTitle("Embed Content").closest('div[class*="custom-class"]');
      expect(container).toHaveClass("custom-class");
    });
  });
});
