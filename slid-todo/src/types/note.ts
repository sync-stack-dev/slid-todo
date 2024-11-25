interface NoteTodo {
  id: number;
  title: string;
  done: boolean;
}

interface NoteGoal {
  id: number;
  title: string;
}

export interface Note {
  todo: NoteTodo;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: NoteGoal;
  userId: number;
  teamId: string;
  content: string;
  linkUrl?: string;
  fileUrl?: string;
}

export interface NotesResponse {
  nextCursor: number;
  totalCount: number;
  notes: Note[];
}
