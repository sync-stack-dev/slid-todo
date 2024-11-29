import type { Meta, StoryObj } from "@storybook/react";
import { MoreMenu } from "..";

const meta = {
  title: "Components/MoreMenu",
  component: MoreMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "할 일, 노트, 목표의 수정/삭제 기능을 제공하는 드롭다운 메뉴입니다.",
      },
    },
  },
  argTypes: {
    onDelete: {
      description: "삭제 관련 설정",
      table: {
        type: {
          summary: "object",
          detail: `{
  title: string;      // 삭제 확인 모달의 제목
  description: string; // 삭제 확인 모달의 설명
  action: () => Promise<void>; // 삭제 실행 함수
}`,
        },
      },
    },
    onEdit: {
      description: "수정 관련 설정",
      table: {
        type: {
          summary: "object",
          detail: `{
  type: "todo" | "note" | "goal"; // 수정할 항목의 타입
  data: Todo | Note | Goal;       // 수정할 데이터
  action: (data: any) => Promise<void>; // 수정 실행 함수
}`,
        },
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MoreMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTodo = {
  id: 1,
  title: "예시 할 일",
  description: "이것은 예시 할 일입니다.",
  done: false,
  goal: {
    id: 1,
    title: "예시 목표",
  },
  userId: 1,
  teamId: "team1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const TodoMoreMenu: Story = {
  args: {
    onDelete: {
      title: "할 일을 삭제하시겠어요?",
      description: "삭제한 할 일은 복구할 수 없습니다.",
      action: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("할 일 삭제됨");
      },
    },
    onEdit: {
      type: "todo",
      data: mockTodo,
      action: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("할 일 수정됨:", data);
      },
    },
  },
};

const mockNote = {
  id: 1,
  title: "예시 노트",
  content: "이것은 예시 노트입니다.",
  todo: {
    id: 1,
    title: "예시 할 일",
    done: false,
  },
  goal: {
    id: 1,
    title: "예시 목표",
  },
  userId: 1,
  teamId: "team1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const NoteMoreMenu: Story = {
  args: {
    onDelete: {
      title: "노트를 삭제하시겠어요?",
      description: "삭제한 노트는 복구할 수 없습니다.",
      action: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("노트 삭제됨");
      },
    },
    onEdit: {
      type: "note",
      data: mockNote,
      action: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("노트 수정됨:", data);
      },
    },
  },
};

const mockGoal = {
  id: 1,
  title: "예시 목표",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const GoalMoreMenu: Story = {
  args: {
    onDelete: {
      title: "목표를 삭제하시겠어요?",
      description: "삭제한 목표는 복구할 수 없습니다.",
      action: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("목표 삭제됨");
      },
    },
    onEdit: {
      type: "goal",
      data: mockGoal,
      action: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("목표 수정됨:", data);
      },
    },
  },
};
