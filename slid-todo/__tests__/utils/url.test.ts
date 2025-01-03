import { ensureHttps } from "@/utils/url";
import { expect } from "@jest/globals";

describe("URL Utils", () => {
  describe("ensureHttps", () => {
    it("http://로 시작하는 URL은 그대로 반환한다", () => {
      const url = "http://example.com";
      expect(ensureHttps(url)).toBe(url);
    });

    it("https://로 시작하는 URL은 그대로 반환한다", () => {
      const url = "https://example.com";
      expect(ensureHttps(url)).toBe(url);
    });

    it("프로토콜이 없는 URL에 https://를 추가한다", () => {
      const url = "example.com";
      expect(ensureHttps(url)).toBe("https://example.com");
    });

    it("빈 문자열이 입력되면 https://를 추가한다", () => {
      expect(ensureHttps("")).toBe("https://");
    });

    it("서브도메인이 있는 URL도 올바르게 처리한다", () => {
      const url = "sub.example.com";
      expect(ensureHttps(url)).toBe("https://sub.example.com");
    });

    it("경로가 포함된 URL도 올바르게 처리한다", () => {
      const url = "example.com/path";
      expect(ensureHttps(url)).toBe("https://example.com/path");
    });
  });
});
