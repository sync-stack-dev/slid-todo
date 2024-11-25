import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "@/components/shared/loading";

/**
 * [Loading](cci:1://file:///c:/Users/rzt03/OneDrive/%EB%B0%94%ED%83%95%20%ED%99%94%EB%A9%B4/clone-2/code-it-2/slid-todo/src/components/shared/loading.tsx:2:0-19:2) 컴포넌트는 Lottie 애니메이션을 사용하여 로딩 상태를 표시하는 전체 화면 로딩 인디케이터입니다.
 *
 * ## 주요 기능
 * - Lottie 애니메이션을 통한 부드러운 로딩 효과
 * - 전체 화면 중앙 정렬
 * - 자동 재생 및 무한 반복
 *
 * ## 사용 방법
 * ```tsx
 * import { Loading } from "@/components/shared/loading";
 *
 * function App() {
 *   const [isLoading, setIsLoading] = useState(true);
 *
 *   if (isLoading) {
 *     return <Loading />;
 *   }
 *
 *   return <YourComponent />;
 * }
 * ```
 *
 * ## 참고사항
 * - 로딩 애니메이션은 `@/public/loading.json`의 Lottie 파일을 사용합니다
 * - 애니메이션은 200x200 크기로 표시됩니다
 * - 이미지 로드와 애니메이션 완료 시 콘솔에 로그가 출력됩니다
 */
const meta = {
  title: "Components/Shared/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 로딩 화면입니다.
 * 전체 화면에 Lottie 애니메이션이 중앙 정렬되어 표시됩니다.
 */
export const Default: Story = {};
