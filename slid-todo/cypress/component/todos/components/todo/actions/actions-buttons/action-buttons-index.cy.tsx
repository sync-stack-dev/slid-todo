import { ActionButtons } from "@/app/(routes)/(todos)/todos/components/todo/actions/action-buttons";
import { mount } from "cypress/react18";
import { todoWithAllProps, todoWithNoProps } from "../../../../test-data";

describe("ActionButtons Component", () => {
  it("모든 버튼이 렌더링 되어야 한다.", () => {
    const onNoteClick = cy.stub();
    mount(<ActionButtons todo={todoWithAllProps} onNoteClick={onNoteClick} />);

    cy.get('[data-cy="link-button"]').should("exist");
    cy.get('[data-cy="file-button"]').should("exist");
    cy.get('[data-cy="note-button"]').should("exist");
  });

  it("버튼이 렌더링되지 않아야 한다.", () => {
    const onNoteClick = cy.stub();
    mount(<ActionButtons todo={todoWithNoProps} onNoteClick={onNoteClick} />);

    cy.get('[data-cy="link-button"]').should("not.exist");
    cy.get('[data-cy="file-button"]').should("not.exist");
    cy.get('[data-cy="note-button"]').should("not.exist");
  });

  it("NoteButton 클릭시 onNoteClick이 호출되어야 한다.", () => {
    const onNoteClick = cy.spy().as("onNoteClick");
    mount(<ActionButtons todo={todoWithAllProps} onNoteClick={onNoteClick} />);

    cy.get('[data-cy="note-button"]').click();
    cy.get("@onNoteClick").should("have.been.called");
  });
});
