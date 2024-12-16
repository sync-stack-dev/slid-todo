// __tests__/data/noteData.ts
export const mockNoteData = (id: number) => ({
  data: {
    todo: {
      id,
      title: `Test todo ${id}`,
      done: false,
    },
    updatedAt: "2024-12-12T12:00:00Z",
    createdAt: "2024-12-12T12:00:00Z",
    title: `Note ${id}`,
    id,
    goal: {
      id: 1,
      title: "Test goal",
    },
    userId: 123,
    teamId: "Test team",
    content: "This is a test note",
  },
  isLoading: false,
  isError: false,
});

export const mockNoteList = [
  mockNoteData(1).data,
  mockNoteData(2).data,
  mockNoteData(3).data,
  mockNoteData(4).data,
  mockNoteData(5).data,
];
