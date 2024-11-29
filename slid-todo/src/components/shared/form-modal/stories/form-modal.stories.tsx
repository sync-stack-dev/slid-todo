import type { Meta, StoryObj } from "@storybook/react";
import { FormModal } from "@/components/shared/form-modal";
import { useFormModal } from "@/stores/use-form-modal-store";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfirmModal } from "@/components/shared/confirm-modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock goals data for Storybook
queryClient.setQueryData(["goals"], {
  goals: [
    { id: 1, title: "목표 1" },
    { id: 2, title: "목표 2" },
    { id: 3, title: "목표 3" },
  ],
});

/**
 * `FormModal`은 할 일, 노트, 목표를 생성하거나 수정할 때 사용되는 다목적 폼 모달 컴포넌트입니다.
 * React Hook Form과 Zod를 사용하여 폼 상태 관리와 유효성 검사를 처리합니다.
 *
 * ## 주요 기능
 * - 3가지 타입 지원: 할 일(todo), 노트(note), 목표(goal)
 * - 2가지 모드: 생성(create), 수정(edit)
 * - 파일 업로드 및 링크 추가 기능
 * - 폼 유효성 검사
 * - 변경사항 있을 시 나가기 확인
 *
 * ## 사용 방법
 * ```tsx
 * import { useFormModal } from "@/stores/use-form-modal-store";
 *
 * function YourComponent() {
 *   const { onOpen } = useFormModal();
 *
 *   const handleOpenModal = () => {
 *     onOpen({
 *       type: "todo",
 *       mode: "create",
 *       onSubmit: async (data) => {
 *         // 폼 제출 처리
 *         console.log(data);
 *       }
 *     });
 *   };
 *
 *   return <button onClick={handleOpenModal}>할 일 추가</button>;
 * }
 * ```
 */
const meta = {
  title: "Components/Shared/FormModal",
  component: FormModal,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ConfirmModal />
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof FormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function TodoButton() {
  const { onOpen } = useFormModal();

  return (
    <div className="p-4">
      <Button
        onClick={() => {
          onOpen({
            type: "todo",
            mode: "create",
            onSubmit: async (data) => {
              console.log("할 일 생성:", data);
            },
          });
        }}
      >
        할 일 추가
      </Button>
    </div>
  );
}

function NoteButton() {
  const { onOpen } = useFormModal();

  return (
    <div className="p-4">
      <Button
        variant="secondary"
        onClick={() => {
          onOpen({
            type: "note",
            mode: "create",
            onSubmit: async (data) => {
              console.log("노트 생성:", data);
            },
          });
        }}
      >
        노트 추가
      </Button>
    </div>
  );
}

function GoalButton() {
  const { onOpen } = useFormModal();

  return (
    <div className="p-4">
      <Button
        variant="outline"
        onClick={() => {
          onOpen({
            type: "goal",
            mode: "create",
            onSubmit: async (data) => {
              console.log("목표 생성:", data);
            },
          });
        }}
      >
        목표 추가
      </Button>
    </div>
  );
}

function EditTodoButton() {
  const { onOpen } = useFormModal();

  return (
    <div className="p-4">
      <Button
        variant="default"
        onClick={() => {
          onOpen({
            type: "todo",
            mode: "edit",
            defaultValues: {
              id: 1,
              title: "기존 할 일",
              description: "할 일에 대한 설명입니다.",
              done: false,
            },
            onSubmit: async (data) => {
              console.log("할 일 수정:", data);
            },
          });
        }}
      >
        할 일 수정
      </Button>
    </div>
  );
}

/**
 * 새로운 할 일을 생성하는 모달입니다.
 * 제목, 설명, 파일 업로드, 링크 추가 기능을 제공합니다.
 */
export const CreateTodo: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <TodoButton />
      </>
    ),
  ],
};

/**
 * 새로운 노트를 생성하는 모달입니다.
 * 제목, 설명, 파일 업로드, 링크 추가 기능을 제공합니다.
 */
export const CreateNote: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <NoteButton />
      </>
    ),
  ],
};

/**
 * 새로운 목표를 생성하는 모달입니다.
 * 제목만 입력받습니다.
 */
export const CreateGoal: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <GoalButton />
      </>
    ),
  ],
};

/**
 * 기존 할 일을 수정하는 모달입니다.
 * 기존 데이터가 폼에 미리 채워져 있습니다.
 */
export const EditTodo: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <EditTodoButton />
      </>
    ),
  ],
};
