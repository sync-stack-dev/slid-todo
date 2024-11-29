import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScrollTrigger } from "@/components/shared/infinite-scroll-trigger";

/**
 * `InfiniteScrollTrigger`는 무한 스크롤 기능을 구현할 때 사용되는 로딩 인디케이터 컴포넌트입니다.
 * 스크롤이 트리거 지점에 도달했을 때 로딩 상태를 시각적으로 표시합니다.
 *
 * ## 주요 기능
 * - 로딩 상태 표시 (스피너 + 텍스트)
 * - ref를 통한 스크롤 감지 지점 설정
 * - 애니메이션 효과 (페이드인, 스피너 회전)
 *
 * ## 사용 방법
 * ```tsx
 * import { useInfiniteScroll } from "your-infinite-scroll-hook";
 * import { InfiniteScrollTrigger } from "@/components/shared/infinite-scroll-trigger";
 *
 * function TodoList() {
 *   const { ref, isLoading } = useInfiniteScroll();
 *
 *   return (
 *     <div>
 *       {items.map(item => (
 *         <TodoItem key={item.id} {...item} />
 *       ))}
 *
 *       <InfiniteScrollTrigger
 *         ref={ref}
 *         isLoading={isLoading}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
const meta = {
  title: "Components/Shared/InfiniteScrollTrigger",
  component: InfiniteScrollTrigger,
  tags: ["autodocs"],
  args: {
    isLoading: false,
  },
} satisfies Meta<typeof InfiniteScrollTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 상태의 트리거입니다.
 * 로딩 중이 아닐 때는 아무것도 표시되지 않습니다.
 */
export const Default: Story = {};

/**
 * 로딩 상태의 트리거입니다.
 * 스피너와 함께 "할 일 불러오는 중..." 텍스트가 표시됩니다.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
