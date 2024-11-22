import TodoActions from "@/app/(routes)/(todos)/todos/components/todo/actions";
import { mount } from "cypress/react18";
import { noteData, todoWithAllProps, todoWithNoProps } from "../../../test-data";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("할 일 액션 컴포넌트", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });
  afterEach(() => {
    queryClient.clear();
  });

  it("노트 버튼을 클릭하면 노트 뷰어가 열려야 한다", () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <TodoActions todo={todoWithAllProps} />
      </QueryClientProvider>,
    );

    cy.intercept("GET", "**/notes/**", {
      statusCode: 200,
      body: noteData,
    });

    cy.get("[data-cy=note-button]").click();
    cy.get("[data-cy=note-sheet]").should("be.visible");
  });

  it("노트가 없는 할 일의 경우 노트 버튼이 비활성화되어야 한다", () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <TodoActions todo={todoWithNoProps} />
      </QueryClientProvider>,
    );

    cy.get("[data-cy=note-button]").should("be.disabled");
  });
});
