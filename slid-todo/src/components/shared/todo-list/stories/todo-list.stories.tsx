import type { Meta, StoryObj } from "@storybook/react";
import { TodoList } from "..";
import { Todo } from "@/types/todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

/**
 * `TodoList` 컴포넌트는 할 일 목록을 표시하는 컴포넌트입니다.
 *
 * ### 주요 기능
 * - 할 일 항목 표시
 * - 체크박스를 통한 완료 상태 토글
 * - 무한 스크롤 지원
 * - 할 일별 액션 버튼 (링크, 파일, 노트)
 * - 수정/삭제 메뉴
 *
 * ### 사용 예시
 * ```tsx
 * const MyTodoList = () => {
 *   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(...);
 *   const observerRef = useIntersectionObserver(fetchNextPage, hasNextPage);
 *
 *   return (
 *     <TodoList
 *       todos={data.pages.flatMap(page => page.todos)}
 *       observerRef={observerRef}
 *       isLoading={isFetchingNextPage}
 *     />
 *   );
 * };
 * ```
 */
const meta = {
  title: "Components/TodoList",
  component: TodoList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "할 일 목록을 표시하고 관리하는 컴포넌트입니다. 무한 스크롤, 상태 관리, 다양한 액션을 지원합니다.",
      },
    },
  },
  argTypes: {
    todos: {
      description: "표시할 할 일 목록",
      control: "object",
      table: {
        type: {
          summary: "Todo[]",
          detail: `interface Todo {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  linkUrl?: string;
  fileUrl?: string;
  noteId?: number;
  goal: {
    id: number;
    title: string;
  };
  userId: number;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}`,
        },
      },
    },
    observerRef: {
      description: "무한 스크롤을 위한 Intersection Observer ref 콜백",
      control: false,
    },
    isLoading: {
      description: "다음 페이지 로딩 상태",
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="max-w-3xl mx-auto border rounded-lg p-4 min-h-[400px]">
            <Story />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 할 일 데이터 생성 함수
const createTodo = (index: number, options: Partial<Todo> = {}) => ({
  id: index,
  title: `할 일 ${index}`,
  description: `할 일 ${index}에 대한 설명입니다.`,
  done: false,
  goal: {
    id: 1,
    title: "2024년 목표 달성하기",
  },
  userId: 1,
  teamId: "team1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...options,
});

// 다양한 상태의 할 일 목록
const generateTodoList = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const variations = [
      {
        // 기본
        title: `할 일 ${index}`,
      },
      {
        // 완료된 할 일
        title: `완료된 할 일 ${index}`,
        done: true,
      },
      {
        // 링크가 있는 할 일
        title: `링크가 있는 할 일 ${index}`,
        linkUrl: "https://example.com",
      },
      {
        // 파일이 있는 할 일
        title: `파일이 있는 할 일 ${index}`,
        fileUrl: "https://example.com/file.pdf",
      },
      {
        // 노트가 있는 할 일
        title: `노트가 있는 할 일 ${index}`,
        noteId: index,
      },
      {
        // 모든 기능이 있는 할 일
        title: `모든 기능이 있는 할 일 ${index}`,
        linkUrl: "https://example.com",
        fileUrl: "https://example.com/file.pdf",
        noteId: index,
      },
    ];

    return createTodo(index, variations[i % variations.length]);
  });
};

// 기본 TodoList
export const Default: Story = {
  args: {
    todos: generateTodoList(10),
    observerRef: () => {},
    isLoading: false,
  },
};

// 로딩 상태의 TodoList
export const Loading: Story = {
  args: {
    todos: generateTodoList(10),
    observerRef: () => {},
    isLoading: true,
  },
};

// 빈 TodoList
export const Empty: Story = {
  args: {
    todos: [],
    observerRef: () => {},
    isLoading: false,
  },
};

// 많은 할 일이 있는 TodoList
export const ManyTodos: Story = {
  args: {
    todos: generateTodoList(50),
    observerRef: () => {},
    isLoading: false,
  },
};

// 긴 제목의 할 일이 있는 TodoList
export const LongTitles: Story = {
  args: {
    todos: [
      createTodo(1, {
        title:
          "이것은 매우 긴 할 일 제목입니다. 이렇게 긴 제목은 UI에서 어떻게 표시되는지 테스트해볼 필요가 있습니다. 특히 모바일 환경에서는 더욱 중요합니다.",
      }),
      createTodo(2, {
        title:
          "또 다른 긴 제목의 할 일입니다. 할 일 제목이 길어질 경우 레이아웃이 깨지지 않고 적절하게 줄바꿈이 되어야 합니다.",
        done: true,
      }),
      ...generateTodoList(3),
    ],
    observerRef: () => {},
    isLoading: false,
  },
};

// 모든 할 일이 완료된 TodoList
export const AllCompleted: Story = {
  args: {
    todos: generateTodoList(10).map((todo) => ({
      ...todo,
      done: true,
    })),
    observerRef: () => {},
    isLoading: false,
  },
};

// 다양한 액션이 있는 TodoList
export const WithActions: Story = {
  args: {
    todos: [
      createTodo(1, {
        title: "링크만 있는 할 일",
        linkUrl: "https://example.com",
      }),
      createTodo(2, {
        title: "파일만 있는 할 일",
        fileUrl: "https://example.com/file.pdf",
      }),
      createTodo(3, {
        title: "노트만 있는 할 일",
        noteId: 1,
      }),
      createTodo(4, {
        title: "링크와 파일이 있는 할 일",
        linkUrl: "https://example.com",
        fileUrl: "https://example.com/file.pdf",
      }),
      createTodo(5, {
        title: "모든 액션이 있는 할 일",
        linkUrl: "https://example.com",
        fileUrl: "https://example.com/file.pdf",
        noteId: 1,
      }),
    ],
    observerRef: () => {},
    isLoading: false,
  },
};
