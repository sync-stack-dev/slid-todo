import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스를 조건부로 적용하고 충돌을 해결하는 유틸리티 함수
 *
 * @example
 * 1. 기본 사용
 * cn("px-4 py-2", "bg-blue-500")
 *
 * 2. 조건부 스타일링
 * cn("px-4", { "bg-blue-500": isPrimary })
 *
 * 3. 클래스 충돌 해결
 * cn("p-4", "p-8") // -> "p-8"이 적용됨
 *
 * @why
 * - 조건부 스타일링을 깔끔하게 처리
 * - 클래스 충돌 자동 해결
 * - 코드 가독성 향상
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
