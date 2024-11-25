import type { Meta, StoryObj } from "@storybook/react";
import { NoteViewer } from "..";

const meta = {
  title: "Components/NoteViewer",
  component: NoteViewer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "할 일의 노트를 보여주는 시트 컴포넌트입니다. 오른쪽에서 슬라이드되어 나타나며, 노트의 제목, 내용, 관련 링크 등을 표시합니다.",
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "시트의 열림/닫힘 상태",
      control: "boolean",
    },
    onOpenChange: {
      description: "시트 상태 변경 핸들러",
      control: false,
    },
    todo: {
      description: "노트와 연결된 할 일 데이터",
      control: "object",
    },
    noteData: {
      description: "표시할 노트 데이터",
      control: "object",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoteViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTodo = {
  id: 1,
  title: "리액트 공부하기",
  description: "리액트의 기초부터 고급 개념까지 학습",
  done: false,
  goal: {
    id: 1,
    title: "프론트엔드 개발자 되기",
  },
  userId: 1,
  teamId: "team1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockNote = {
  id: 1,
  title: "리액트 학습 노트",
  content: `# React의 주요 개념

1. 컴포넌트
- 함수형 컴포넌트
- 클래스형 컴포넌트
- Props와 State

2. 생명주기
- Mount
- Update
- Unmount

3. Hooks
- useState
- useEffect
- useContext
- useReducer

4. 성능 최적화
- useMemo
- useCallback
- React.memo`,
  todo: {
    id: 1,
    title: "리액트 공부하기",
    done: false,
  },
  goal: {
    id: 1,
    title: "프론트엔드 개발자 되기",
  },
  userId: 1,
  teamId: "team1",
  linkUrl: "https://react.dev",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// 기본적인 노트 뷰어
export const Default: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    todo: mockTodo,
    noteData: mockNote,
  },
};

// 링크가 없는 노트
export const WithoutLink: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    todo: mockTodo,
    noteData: {
      ...mockNote,
      linkUrl: undefined,
    },
  },
};

// 긴 내용의 노트
export const LongContent: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    todo: mockTodo,
    noteData: {
      ...mockNote,
      content: `# 매우 긴 노트 내용

${Array(10)
  .fill(0)
  .map(
    (_, i) => `
## 섹션 ${i + 1}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

- 항목 1
- 항목 2
- 항목 3

### 하위 섹션

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
  )
  .join("\n")}`,
    },
  },
};

// 노트가 없는 경우
export const NoNote: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    todo: mockTodo,
    noteData: null,
  },
};

// 매우 긴 제목의 노트
export const LongTitle: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    todo: {
      ...mockTodo,
      title:
        "이것은 매우 긴 할 일 제목입니다. 이렇게 긴 제목은 UI에서 어떻게 표시되는지 테스트해볼 필요가 있습니다.",
    },
    noteData: {
      ...mockNote,
      title:
        "이것은 매우 긴 노트 제목입니다. 이렇게 긴 제목은 UI에서 어떻게 표시되는지 테스트해볼 필요가 있습니다.",
      goal: {
        ...mockNote.goal,
        title:
          "이것은 매우 긴 목표 제목입니다. 이렇게 긴 제목은 UI에서 어떻게 표시되는지 테스트해볼 필요가 있습니다.",
      },
    },
  },
};

// 매우 긴 URL의 노트
export const LongUrl: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    todo: mockTodo,
    noteData: {
      ...mockNote,
      linkUrl:
        "https://example.com/very/long/url/that/might/break/the/layout/and/needs/to/be/tested/properly/in/the/ui/component/with/proper/wrapping/and/overflow/handling",
    },
  },
};
