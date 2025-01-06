export const mockGoal = (id: number) => ({
  id,
  title: `Test Goal ${id}`,
  description: `Test Description ${id}`,
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
});

export const mockGoalList = [1, 2, 3].map((id) => mockGoal(id));
export const mockGoalWithDetails = (id: number) => ({
  id,
  title: `Test Goal ${id}`,
  updatedAt: "2024-01-01T00:00:00Z",
  createdAt: "2024-01-01T00:00:00Z",
  userId: 123,
  teamId: "team1",
});

export const mockGoalsResponse = (count: number = 3) => ({
  nextCursor: count + 1,
  goals: Array.from({ length: count }, (_, i) => mockGoalWithDetails(i + 1)),
  totalCount: count,
});
