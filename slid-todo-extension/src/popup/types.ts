// Goal 관련 타입
export interface Goal {
  id: number;
  teamId: string;
  userId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalsResponse {
  goals: Goal[];
  nextCursor: number | null;
  totalCount: number;
}

export interface CreateTodoRequest {
  title: string;
  goalId: number;
  linkUrl?: string;
  fileUrl?: string;
  description?: string;
}

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  linkUrl?: string;
  fileUrl?: string;
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
  todos: Todo[];
  nextCursor?: number;
  totalCount: number;
}
