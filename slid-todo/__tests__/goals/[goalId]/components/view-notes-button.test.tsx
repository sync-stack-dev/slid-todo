import { ViewNotesButton } from "@/app/(routes)/goals/[goalId]/components/view-notes-button";
import { renderWithProviders } from "../../../data/test-utils";
import { expect } from "@jest/globals";

jest.mock("next/navigation", () => ({
  useParams: () => ({
    goalId: "test-goal-id",
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("View Notes Button", () => {
  it("노트 모아보기 버튼을 렌더링한다.", () => {
    const { getByText } = renderWithProviders(<ViewNotesButton />);
    expect(getByText("노트 모아보기")).toBeInTheDocument();
  });

  it("노트 모아보기 버튼이 올바른 링크를 가지고 있다.", () => {
    const { getByRole } = renderWithProviders(<ViewNotesButton />);
    const link = getByRole("link");
    expect(link).toHaveAttribute("href", "/notes/test-goal-id");
  });

  it("Note 아이콘이 렌더링된다.", () => {
    const { container } = renderWithProviders(<ViewNotesButton />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("ChevronRight 아이콘이 렌더링된다.", () => {
    const { container } = renderWithProviders(<ViewNotesButton />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
