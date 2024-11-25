import TodoFilter from "@/app/(routes)/(todos)/todos/components/todo/todo-filter";

describe("TodoFilter 컴포넌트", () => {
  it("세 개의 탭이 모두 표시되어야 한다", () => {
    cy.mount(<TodoFilter activeTab="all" onTabChange={() => {}} />);

    cy.contains("All").should("exist");
    cy.contains("To do").should("exist");
    cy.contains("Done").should("exist");
  });

  it("activeTab prop에 따라 올바른 탭이 선택되어야 한다", () => {
    cy.mount(<TodoFilter activeTab="all" onTabChange={() => {}} />);
    cy.contains("All").should("have.attr", "data-state", "active");

    cy.mount(<TodoFilter activeTab="todo" onTabChange={() => {}} />);
    cy.contains("To do").should("have.attr", "data-state", "active");

    cy.mount(<TodoFilter activeTab="done" onTabChange={() => {}} />);
    cy.contains("Done").should("have.attr", "data-state", "active");
  });

  it("탭 클릭시 onTabChange가 올바른 값과 함께 호출되어야 한다", () => {
    const onTabChange = cy.stub().as("onTabChange");
    cy.mount(<TodoFilter activeTab="all" onTabChange={onTabChange} />);

    cy.contains("To do").click();
    cy.get("@onTabChange").should("have.been.calledWith", "todo");

    cy.contains("Done").click();
    cy.get("@onTabChange").should("have.been.calledWith", "done");
  });
});
