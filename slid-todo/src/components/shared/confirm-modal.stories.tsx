import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { Button } from "@/components/ui/button";

/**
 * `ConfirmModal`은 사용자에게 중요한 작업을 확인받을 때 사용하는 전역 모달 컴포넌트입니다.
 * Zustand store를 통해 전역적으로 상태를 관리하며, 어디서든 쉽게 호출할 수 있습니다.
 *
 * ## 주요 기능
 * - 전역에서 호출 가능한 확인 모달
 * - 3가지 스타일 지원: 기본(파란색), 위험(빨간색), 경고(노란색)
 * - 커스텀 가능한 제목, 설명, 버튼 텍스트
 *
 * ## 사용 방법
 * ```tsx
 * import { useConfirmModal } from "@/stores/use-confirm-modal-store";
 *
 * // 컴포넌트 내부에서
 * const { onOpen } = useConfirmModal();
 *
 * // 기본 사용법
 * onOpen({
 *   title: "작업 확인",
 *   description: "이 작업을 진행하시겠습니까?",
 *   onConfirm: () => {
 *     // 확인 버튼 클릭 시 실행할 로직
 *   }
 * });
 *
 * // 위험한 작업 (빨간색)
 * onOpen({
 *   title: "항목 삭제",
 *   description: "이 항목을 영구적으로 삭제하시겠습니까?",
 *   variant: "danger",
 *   confirmText: "삭제",
 *   onConfirm: () => {
 *     // 삭제 로직
 *   }
 * });
 *
 * // 경고 작업 (노란색)
 * onOpen({
 *   title: "저장되지 않은 변경사항",
 *   description: "변경사항을 저장하지 않고 나가시겠습니까?",
 *   variant: "warning",
 *   confirmText: "나가기",
 *   onConfirm: () => {
 *     // 나가기 로직
 *   }
 * });
 * ```
 */
const meta = {
  title: "Components/Shared/ConfirmModal",
  component: ConfirmModal,
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultButton() {
  const { onOpen } = useConfirmModal();

  return (
    <div className="p-4">
      <Button
        onClick={() => {
          onOpen({
            title: "작업 확인",
            description: "이 작업을 진행하시겠습니까?",
            onConfirm: () => {
              console.log("기본 확인 완료");
            },
          });
        }}
      >
        기본 확인
      </Button>
    </div>
  );
}

function DangerButton() {
  const { onOpen } = useConfirmModal();

  return (
    <div className="p-4">
      <Button
        variant="destructive"
        onClick={() => {
          onOpen({
            title: "할 일 삭제",
            description: "이 할 일을 영구적으로 삭제하시겠습니까?",
            variant: "danger",
            confirmText: "삭제",
            onConfirm: () => {
              console.log("삭제 확인 완료");
            },
          });
        }}
      >
        삭제 확인
      </Button>
    </div>
  );
}

function WarningButton() {
  const { onOpen } = useConfirmModal();

  return (
    <div className="p-4">
      <Button
        variant="secondary"
        onClick={() => {
          onOpen({
            title: "변경사항 저장",
            description: "저장하지 않은 변경사항이 있습니다. 저장하시겠습니까?",
            variant: "warning",
            confirmText: "저장",
            onConfirm: () => {
              console.log("저장 확인 완료");
            },
          });
        }}
      >
        경고 확인
      </Button>
    </div>
  );
}

/**
 * 기본적인 확인 모달입니다.
 * 일반적인 작업 확인에 사용됩니다.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <DefaultButton />
      </>
    ),
  ],
};

/**
 * 삭제와 같은 위험한 작업을 수행할 때 사용하는 빨간색 모달입니다.
 * 되돌릴 수 없는 작업을 수행하기 전에 사용하세요.
 */
export const DangerVariant: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <DangerButton />
      </>
    ),
  ],
};

/**
 * 주의가 필요한 작업을 수행할 때 사용하는 노란색 모달입니다.
 * 사용자의 주의가 필요한 작업에 사용하세요.
 */
export const WarningVariant: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <WarningButton />
      </>
    ),
  ],
};
