export const mockTodoData = (id: number) => ({
  id,
  title: `Test todo ${id}`,
  done: id % 2 === 0,
  goal: {
    id: 1,
    title: "Test goal",
  },
  userId: 1,
  teamId: "test-team",
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  description: "Test description",
  noteId: 1,
  linkUrl: "https://test.com",
  fileUrl: "https://test.com",
});

export const mockTodoList = [
  mockTodoData(1),
  mockTodoData(2),
  mockTodoData(3),
  mockTodoData(4),
  mockTodoData(5),
];
