export const mockTodoData = (id: number) => ({
  id,
  title: `Todo ${id}`,
  done: id % 2 === 0,
  noteId: undefined,
  linkUrl: undefined,
  fileUrl: undefined,
  goal: { id: 1, title: "Goal 1" },
  userId: 1,
  teamId: "team1",
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

export const mockTodoList = [
  mockTodoData(1),
  mockTodoData(2),
  mockTodoData(3),
  mockTodoData(4),
  mockTodoData(5),
];

export const createMockTodoData = (todos: ReturnType<typeof mockTodoData>[]) => ({
  pages: [
    {
      todos,
      totalCount: todos.length,
    },
  ],
  pageParams: [null],
});
