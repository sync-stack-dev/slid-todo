describe("Todo 앱", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // TODO : main 화면 변경되면 바꿔줘야함.
  it("초기화면이 렌더링된다.", () => {
    cy.get("h1").contains("Hello World");
  });
});
