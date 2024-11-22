import { CopyButton } from "@/app/(routes)/(todos)/todos/components/todo/actions/action-buttons/copy-button";

describe("CopyButton Component", () => {
  it("카피 버튼이 렌더링 되어야한다.", () => {
    cy.mount(<CopyButton />);
    cy.get("[data-cy=copy-button]").should("exist");
  });
});
