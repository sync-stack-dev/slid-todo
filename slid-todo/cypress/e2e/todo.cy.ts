describe("Todo 앱", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("할 일 목록이 표시되어야 한다", () => {
    cy.get("h2").contains("모든 할 일");
  });

  it("할 일 추가 버튼이 있어야 한다", () => {
    cy.contains("+ 할일 추가").should("exist");
  });
});
