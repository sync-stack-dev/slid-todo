export interface NoteToDo {
  id: number;
  title: string;
  done: boolean;
}

export interface NoteGoal {
  id: number;
  title: string;
}

export interface Note {
  id: number;
  userId: number;
  teamId: string;
  title: string;
  todo: NoteToDo;
  goal: NoteGoal;
  updatedAt: Date | string;
  createdAt: Date | string;
  nullable?: boolean;
}
