export interface Todo {
  noteId: number;
  done: boolean;
  linkUrl: string;
  fileUrl: string;
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
  todos: Todo[];
  nextCursor: number;
  totalCount: number;
}

export interface GetTodosParams {
  goalId: number;
  cursor?: number;
  size?: number;
}
