interface Goal {
  id: number;
  title: string;
}

export interface Note {
  todo: {
    done: boolean;
    title: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: Goal;
  userId: number;
  teamId: string;
  content: string;
}

export interface NotesResponse {
  nextCursor: number;
  totalCount: number;
  notes: Note[];
}
