export interface Todo {
  noteId?: number;
  done: boolean;
  linkUrl?: string;
  fileUrl?: string;
  title: string;
  id: number;
  goal: {
    id: number;
    title: string;
  };
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  description?: string;
}

export interface TodosResponse {
  todos?: Todo[];
  nextCursor?: number;
  totalCount?: number;
}

export interface GetTodosParams {
  goalId: number;
  cursor?: number;
  size?: number;
}

// 프로그레스 추가로 커스텀한 타입
interface dashBoardGoal {
  id: number; // 'string' 대신 'number'로 변경
  title: string;
  progress: number;
  createdAt: string; // 추가 속성 정의 (필요 시)
  updatedAt: string;
  userId: number;
  teamId: string;
}
