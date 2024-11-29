/**
 * URL이 http:// 또는 https://로 시작하지 않으면 https://를 추가합니다.
 * @param url - 처리할 URL 문자열
 * @returns 완전한 형식의 URL
 */
export const ensureHttps = (url: string): string => {
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};
