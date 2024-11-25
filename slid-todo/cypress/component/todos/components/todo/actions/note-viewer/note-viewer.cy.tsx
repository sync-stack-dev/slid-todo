import { NoteViewer } from "@/app/(routes)/(todos)/todos/components/todo/actions/note-viewer";
import { mount } from "cypress/react18";
import { noteData, todoWithAllProps } from "../../../../test-data";

describe("할 일 노트 뷰어", () => {
  beforeEach(() => {
    cy.viewport(1280, 2280);

    mount(
      <NoteViewer
        isOpen={true}
        onOpenChange={() => {}}
        todo={todoWithAllProps}
        noteData={noteData}
      />,
    );
  });

  it("노트의 제목과 내용이 올바르게 표시되어야 한다", () => {
    cy.get("h1").contains(noteData.title).should("be.visible");

    const contentLines = noteData.content.split("\n");
    contentLines.forEach((line) => {
      cy.contains(line).should("be.visible");
    });
  });

  it("연결된 할 일과 목표 정보가 표시되어야 한다", () => {
    cy.get("nav").contains(noteData.goal.title).should("be.visible");
    cy.contains(todoWithAllProps.title).should("be.visible");
  });

  it("링크가 있는 경우 링크가 표시되어야 한다", () => {
    cy.contains(noteData.linkUrl).should("be.visible");
  });

  it("생성된 날짜가 표시되어야 한다", () => {
    cy.get("time").should("have.attr", "datetime", noteData.updatedAt).and("be.visible");
    // 날짜는 받아오는 정보와 표시되는 정보가 다르기 때문에 포맷팅 해야 함
    const formattedDate = new Date(noteData.updatedAt).toLocaleDateString();
    cy.get("time").contains(formattedDate).should("be.visible");
  });

  it("닫기 버튼을 클릭하면 onOpenChange가 호출되어야 한다", () => {
    const onOpenChange = cy.stub().as("onOpenChange");
    mount(
      <NoteViewer
        isOpen={true}
        onOpenChange={onOpenChange}
        todo={todoWithAllProps}
        noteData={noteData}
      />,
    );
    cy.get("[data-cy=close-button]").click();
    cy.get("@onOpenChange").should("have.been.calledWith", false);
  });

  it("isOpen이 false일 때는 내용이 보이지 않아야 한다", () => {
    mount(
      <NoteViewer
        isOpen={false}
        onOpenChange={() => {}}
        todo={todoWithAllProps}
        noteData={noteData}
      />,
    );
    cy.get("h1").should("not.exist");
  });
});
