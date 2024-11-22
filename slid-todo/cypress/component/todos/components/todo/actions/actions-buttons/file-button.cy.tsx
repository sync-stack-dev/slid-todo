import { FileButton } from "@/app/(routes)/(todos)/todos/components/todo/actions/action-buttons/file-button";

describe("FileButton Component", () => {
  it("파일 버튼이 렌더링 되어야한다.", () => {
    cy.mount(<FileButton url="https://example.com" />);
    cy.get("[data-cy=file-button]").should("exist");
  });
});
