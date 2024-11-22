import { NoteButton } from "@/app/(routes)/(todos)/todos/components/todo/actions/action-buttons/note-button";

describe("NoteButton Component", () => {
  it("노트 버튼이 렌더링 되어야한다.", () => {
    cy.mount(<NoteButton onClick={() => {}} />);
    cy.get("[data-cy=note-button]").should("exist");
  });
});
