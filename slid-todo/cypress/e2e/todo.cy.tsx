describe("todos 페이지 테스트", () => {
  beforeEach(() => {
    const API_URL = "https://sp-slidtodo-api.vercel.app";
    const TEAM_ID = Cypress.env("TEAM_ID");

    if (!TEAM_ID) {
      throw new Error("TEAM_ID is not set in environment variables");
    }

    Cypress.config("defaultCommandTimeout", 2000);
    Cypress.config("pageLoadTimeout", 2000);
    Cypress.config("requestTimeout", 2000);

    cy.intercept({
      method: "POST",
      url: "**/auth/login",
    }).as("loginRequest");

    cy.intercept("GET", `${API_URL}/${TEAM_ID}/todos**`).as("getTodos");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/login", { timeout: 5000 });

    const testEmail = Cypress.env("TEST_EMAIL");
    const testPassword = Cypress.env("TEST_PASSWORD");

    if (!testEmail || !testPassword) {
      throw new Error("Test credentials are not set in environment variables");
    }

    console.log("TEAM_ID:", TEAM_ID);
    console.log("TEST_EMAIL:", testEmail);

    cy.get('input[placeholder="이메일을 입력해 주세요"]')
      .should("be.visible", { timeout: 2000 })
      .type(testEmail, { delay: 30 });

    cy.get("[role='password']")
      .should("be.visible", { timeout: 2000 })
      .type(testPassword, { delay: 30 });

    cy.get("[data-cy='login-button']").should("be.visible", { timeout: 2000 }).click();

    cy.wait("@loginRequest", { timeout: 2000 }).then((interception) => {
      console.log("Login Response:", interception.response);
      expect(interception.response?.statusCode).to.eq(201);
    });

    cy.url().should("include", "/", { timeout: 2000 });
  });
  it("할 일 추가 후 데이터가 추가되는지 확인", () => {
    cy.visit("/todos");

    cy.url().should("include", "/todos");

    cy.contains("button", "할 일 추가").click();

    cy.get("[role='dialog']").within(() => {
      cy.get("input[name='title']").type("새로운 할 일");
      cy.contains("button", "링크 첨부").click();
      cy.get("input[name='linkUrl']").type("https://www.naver.com");
      cy.get("[type='submit']").click();
    });

    cy.get("[data-radix-scroll-area-viewport] .flex.items-center").should(
      "contain",
      "새로운 할 일",
    );

    cy.get("a").should("have.attr", "href", "https://www.naver.com");
  });
  it("로그인 성공 후 todos 페이지 접근", () => {
    cy.visit("/todos");

    cy.url().should("include", "/todos");
    cy.get("h2").should("exist");
  });

  it("체크 버튼 클릭 시 체크 상태 변경 확인", () => {
    cy.visit("/todos");
    cy.url().should("include", "/todos");

    cy.get("[role='checkbox']")
      .should("exist")
      .then(($checkboxes) => {
        if ($checkboxes.length > 0) {
          cy.get("[role='checkbox']").first().click();
          cy.get("[role='checkbox']").first().should("have.attr", "data-state", "checked");

          cy.get("[role='checkbox']").first().click();
          cy.get("[role='checkbox']").first().should("have.attr", "data-state", "unchecked");
        } else {
          cy.log("체크할 수 있는 할 일이 없습니다.");
        }
      });
  });

  it("모든 할 일 h2에 총 개수 표시 및 첫 페이지 로딩 확인", () => {
    cy.visit("/todos");
    cy.url().should("include", "/todos");
    cy.wait(1000);
    cy.get("h2")
      .invoke("text")
      .then((text) => {
        const match = text.match(/모든 할 일 \((\d+)\)/);
        const totalCount = parseInt(match![1]);

        expect(totalCount).to.be.a("number");
        expect(totalCount).to.be.at.least(0);
      });
    cy.get("[role='checkbox']")
      .its("length")
      .then((length) => {
        expect(length).to.be.at.least(0);
        expect(length).to.be.at.most(40);
      });
  });

  it("스크롤 시 추가 데이터가 로드되는지 확인", () => {
    cy.intercept("GET", "**/todos?size=40", {
      statusCode: 200,
      body: {
        todos: Array.from({ length: 40 }, (_, index) => ({
          noteId: null,
          done: false,
          linkUrl: "https://www.naver.com",
          fileUrl: null,
          title: `할 일 ${index + 1}`,
          id: 2000 + index,
          goal: null,
          userId: 215,
          teamId: "codeIt222",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        })),
        nextCursor: "next_page",
        totalCount: 60,
      },
    }).as("getTodos");
    cy.intercept("GET", "**/todos?size=40&cursor=next_page", {
      statusCode: 200,
      body: {
        todos: Array.from({ length: 20 }, (_, index) => ({
          noteId: null,
          done: false,
          linkUrl: "https://www.naver.com",
          fileUrl: null,
          title: `할 일 ${index + 41}`,
          id: 2040 + index,
          goal: null,
          userId: 215,
          teamId: "codeIt222",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        })),
        nextCursor: null,
        totalCount: 60,
      },
    }).as("getMoreTodos");
    cy.visit("/todos");
    cy.wait("@getTodos");
    cy.get("[data-radix-scroll-area-viewport] .flex.items-center")
      .should("exist")
      .then(($elements) => {
        const initialCount = $elements.length;

        cy.get("[data-radix-scroll-area-viewport]").scrollTo("bottom", { ensureScrollable: false });

        cy.wait("@getMoreTodos");

        cy.get("[data-radix-scroll-area-viewport] .flex.items-center").should(
          "have.length.gt",
          initialCount,
        );
      });
  });

  it("수정 모달에 기존 데이터가 올바르게 표시되는지 확인", () => {
    cy.visit("/todos");

    cy.get("[data-radix-scroll-area-viewport] .flex.items-center").then(($items) => {
      if ($items.length > 0) {
        cy.wrap($items)
          .first()
          .within(() => {
            cy.get("span").invoke("text").as("originalTitle");
            cy.get("[role='checkbox']").should("have.attr", "data-state").as("originalCheckbox");
            cy.get("button[aria-haspopup='menu']").click();
          });

        cy.get("[data-cy='edit-button']").click();

        cy.get("[role='dialog']").should("be.visible");

        cy.get("@originalTitle").then((originalTitle) => {
          cy.get("@originalCheckbox").then((originalCheckbox) => {
            cy.get("[role='dialog']").within(() => {
              cy.get("input[name='title']").should("have.value", originalTitle);
              cy.get("[role='checkbox']").should("have.attr", "data-state", originalCheckbox);
            });
          });
        });
      } else {
        cy.log("수정할 할 일이 없습니다.");
      }
    });
  });

  it("수정 모달에서 할 일 수정 시 API 요청이 성공하는지 확인", () => {
    cy.intercept("PATCH", "**/todos/*").as("updateTodo");
    cy.visit("/todos", { timeout: 30000 });
    cy.get("h2", { timeout: 5000 }).should("be.visible");
    cy.get("[data-radix-scroll-area-viewport] .flex.items-center", { timeout: 5000 })
      .should("be.visible")
      .then(($items) => {
        if ($items.length > 0) {
          cy.wrap($items)
            .first()
            .within(() => {
              cy.get("button[aria-haspopup='menu']").click();
            });
          cy.get("[data-cy='edit-button']").click();
          cy.get("[role='dialog']").within(() => {
            cy.get("input[name='title']").clear().type("수정된 제목");
            cy.get("[role='checkbox']").click();
            cy.get("[type='submit']").click();
          });
          cy.wait("@updateTodo").its("response.statusCode").should("eq", 200);
        } else {
          cy.log("수정할 할 일이 없습니다.");
        }
      });
  });

  it("Done Tap 클릭 시 완료된 할 일 확인", () => {
    cy.intercept("GET", "**/todos?size=40", {
      statusCode: 200,
      body: {
        todos: Array.from({ length: 5 }, (_, index) => ({
          noteId: null,
          done: true,
          linkUrl: "https://www.naver.com",
          fileUrl: null,
          title: `완료된 할 일 ${index + 1}`,
          id: 4000 + index,
          goal: null,
          userId: 215,
          teamId: Cypress.env("TEAM_ID"),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        })),
        nextCursor: null,
        totalCount: 5,
      },
    }).as("getDoneTasks");

    cy.visit("/todos");
    cy.url().should("include", "/todos");

    cy.contains("button", "Done").click();

    cy.wait("@getDoneTasks");

    cy.get("[data-radix-scroll-area-viewport]")
      .find("[role='checkbox']")
      .should("have.length.at.least", 1)
      .each(($checkbox) => {
        cy.wrap($checkbox).should("have.attr", "data-state", "checked");
      });
  });

  it("To do Tap 클릭 시 미완료된 할 일 확인", () => {
    // 미완료된 할 일 데이터 mock
    cy.intercept("GET", "**/todos?size=40", {
      statusCode: 200,
      body: {
        todos: Array.from({ length: 5 }, (_, index) => ({
          noteId: null,
          done: false,
          linkUrl: "https://www.naver.com",
          fileUrl: null,
          title: `미완료된 할 일 ${index + 1}`,
          id: 3000 + index,
          goal: null,
          userId: 215,
          teamId: "codeIt222",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        })),
        nextCursor: null,
        totalCount: 5,
      },
    }).as("getTodoTasks");
    cy.visit("/todos");
    cy.url().should("include", "/todos");
    cy.contains("button", "To do").click();

    cy.wait("@getTodoTasks");
    cy.get("[data-radix-scroll-area-viewport]")
      .find("[role='checkbox']")
      .should("have.length.at.least", 1)
      .each(($checkbox) => {
        cy.wrap($checkbox).should("have.attr", "data-state", "unchecked");
      });
  });

  it("link 클릭 시 외부 링크로 이동", () => {
    cy.visit("/todos");

    cy.get("[data-cy='link-button']")
      .first()
      .should("have.attr", "target", "_blank")
      .should(($link) => {
        const href = $link.attr("href");
        expect(href).to.not.be.undefined;
        expect(href!.length).to.be.greaterThan(0);
      });
  });

  it("file 버튼 클릭 시 파일 다운로드가 작동하는지 확인", () => {
    cy.intercept("GET", "**/todos?size=40", {
      statusCode: 200,
      body: {
        todos: [
          {
            noteId: null,
            done: false,
            linkUrl: null,
            fileUrl: "https://example.com/test-file.pdf",
            title: "파일이 있는 할 일",
            id: 1,
            goal: null,
            userId: 215,
            teamId: "codeIt222",
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
        ],
        nextCursor: null,
        totalCount: 1,
      },
    }).as("getTodos");
    cy.visit("/todos");
    cy.wait("@getTodos");
    cy.get("[data-cy='file-button']").then(($buttons) => {
      if ($buttons.length > 0) {
        cy.wrap($buttons)
          .first()
          .should("have.attr", "href")
          .and("include", "https://")
          .then(() => {
            cy.wrap($buttons).first().should("have.attr", "download");
          });
      } else {
        cy.log("파일이 있는 할 일이 없습니다.");
      }
    });
  });

  it("할 일 항목에 호버 시 노트 생성 버튼이 표시되는지 확인", () => {
    cy.visit("/todos");

    cy.get("[data-cy='todo-item']")
      .not(":has([data-cy='note-button'])")
      .then(($items) => {
        if ($items.length > 0) {
          cy.wrap($items)
            .first()
            .within(() => {
              cy.get("[data-cy='create-note-button']").should("exist");
            });
        } else {
          cy.log("노트가 없는 할 일 항목이 없습니다.");
        }
      });
  });
  it("삭제 버튼 클릭 시 삭제가 정상적으로 완료되는지 확인", () => {
    // 삭제할 데이터 mock
    cy.intercept("GET", "**/todos?size=40", {
      statusCode: 200,
      body: {
        todos: [
          {
            noteId: null,
            done: false,
            linkUrl: "https://www.naver.com",
            fileUrl: null,
            title: "삭제할 할 일",
            id: 1000,
            goal: null,
            userId: 215,
            teamId: Cypress.env("TEAM_ID"),
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
        ],
        nextCursor: null,
        totalCount: 1,
      },
    }).as("getTodos");

    cy.intercept("DELETE", "**/todos/*", (req) => {
      console.log("Delete Request Headers:", req.headers);
      req.reply({
        statusCode: 204,
        body: {},
      });
    }).as("deleteTodo");

    cy.visit("/todos");
    cy.wait("@getTodos");

    cy.contains("삭제할 할 일").should("be.visible");

    cy.get("[data-radix-scroll-area-viewport] .flex.items-center")
      .first()
      .within(() => {
        cy.get("button[aria-haspopup='menu']").should("be.visible").click();

        cy.wait(1000);
      });

    cy.get("[data-cy='delete-button']").click();
    cy.wait(1000);
    cy.get("[data-cy='confirm-button']").click();

    cy.wait("@deleteTodo").its("response.statusCode").should("eq", 204);
  });
});
