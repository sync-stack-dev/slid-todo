import { LinkButton } from "@/app/(routes)/(todos)/todos/components/todo/actions/action-buttons/link-button";

describe("LinkButton Component", () => {
  it("링크 버튼이 렌더링 되어야한다.", () => {
    cy.mount(<LinkButton url="https://example.com" />);
    cy.get("[data-cy=link-button]").should("exist");
  });
});
