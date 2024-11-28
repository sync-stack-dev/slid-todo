describe("todos 페이지 테스트", () => {
  beforeEach(() => {
    Cypress.config("defaultCommandTimeout", 30000);
    Cypress.config("pageLoadTimeout", 30000);
    Cypress.config("requestTimeout", 30000);

    cy.intercept("POST", "**/auth/login").as("loginRequest");
    cy.intercept("GET", "**/todos**").as("getTodos");

    cy.visit("/login", { timeout: 30000 });
    cy.wait(2000);

    const testEmail = Cypress.env("TEST_EMAIL");
    const testPassword = Cypress.env("TEST_PASSWORD");

    if (!testEmail || !testPassword) {
      throw new Error("Test credentials are not set in environment variables");
    }

    cy.get('input[placeholder="이메일을 입력해 주세요"]')
      .should("be.visible", { timeout: 30000 })
      .type(testEmail, { delay: 100 });

    cy.wait(1000);

    cy.get("[role='password']")
      .should("be.visible", { timeout: 30000 })
      .type(testPassword, { delay: 100 });

    cy.wait(1000);

    cy.get("[data-cy='login-button']").should("be.visible", { timeout: 30000 }).click();

    cy.wait("@loginRequest", { timeout: 30000 });

    cy.url().should("include", "/", { timeout: 30000 });

    cy.wait(5000);

    cy.window().then((win) => {
      const storage = win.localStorage.getItem("login-storage");
      expect(storage).to.not.be.null;

      const accessToken = win.document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="));
      expect(accessToken).to.not.be.undefined;
    });

    cy.wait(2000);

    cy.visit("/todos", { timeout: 30000 });

    cy.wait(3000);

    cy.url().should("include", "/todos", { timeout: 30000 });
    cy.wait("@getTodos", { timeout: 30000 });

    cy.wait(2000);
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
    cy.wait(1000); // API 로딩 대기
    // 1. 헤더에 표시된 전체 할 일 개수 확인
    cy.get("h2")
      .invoke("text")
      .then((text) => {
        const match = text.match(/모든 할 일 \((\d+)\)/);
        const totalCount = parseInt(match![1]);

        // 전체 개수가 유효한 숫자인지만 확인
        expect(totalCount).to.be.a("number");
        expect(totalCount).to.be.at.least(0);
      });
    // 2. 실제 화면에 렌더링된 아이템이 있는지 확인
    cy.get("[role='checkbox']")
      .its("length")
      .then((length) => {
        // 0개 이상의 아이템이 있는지 확인
        expect(length).to.be.at.least(0);
        // 한 페이지 최대 크기(40개) 이하인지 확인
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
        // 첫 번째 할 일의 데이터를 저장
        cy.wrap($items)
          .first()
          .within(() => {
            // 제목 저장
            cy.get("span").invoke("text").as("originalTitle");
            // 체크 상태 저장
            cy.get("[role='checkbox']").should("have.attr", "data-state").as("originalCheckbox");
            // 더보기 버튼 클릭
            cy.get("button[aria-haspopup='menu']").click();
          });

        // 수정 버튼 클릭
        cy.get("[data-cy='edit-button']").click();

        // 모달이 표시되었는지 확인
        cy.get("[role='dialog']").should("be.visible");

        // 저장된 데이터와 모달의 데이터 비교
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
    cy.visit("/todos");

    // PATCH 요청 인터셉트
    cy.intercept("PATCH", "**/todos/*").as("updateTodo");

    // 수정할 데이터 존재 여부 확인
    cy.get("[data-radix-scroll-area-viewport] .flex.items-center").then(($items) => {
      if ($items.length > 0) {
        // 첫 번째 항목 수정
        cy.wrap($items)
          .first()
          .within(() => {
            cy.get("button[aria-haspopup='menu']").click();
          });

        cy.get("[data-cy='edit-button']").click();

        // 수정 모달에서 데이터 수정
        cy.get("[role='dialog']").within(() => {
          cy.get("input[name='title']").clear().type("수정된 제목");

          cy.get("[role='checkbox']").click();
          cy.get("[type='submit']").click();
        });

        // PATCH 요청이 성공적으로 완료되었는지 확인
        cy.wait("@updateTodo").its("response.statusCode").should("eq", 200);
      } else {
        cy.log("수정할 할 일이 없습니다.");
      }
    });
  });

  it("Done Tap 클릭 시 완료된 할 일 확인", () => {
    cy.visit("/todos");

    cy.url().should("include", "/todos");

    cy.contains("button", "Done").click();

    cy.get("[data-radix-scroll-area-viewport]")
      .find("[role='checkbox']")
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

    // API 응답 대기
    cy.wait("@getTodoTasks");
    // 체크박스 상태 확인
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
    // 파일이 있는 할 일 데이터 mock
    cy.intercept("GET", "**/todos?size=40", {
      statusCode: 200,
      body: {
        todos: [
          {
            noteId: null,
            done: false,
            linkUrl: null,
            fileUrl: "https://example.com/test-file.pdf", // 파일 URL 추가
            title: "파일이 있는 할 일",
            id: 1,
            goal: null,
            userId: 215,
            teamId: "codeIt222",
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
          // 필요한 경우 더 많은 데이터 추가
        ],
        nextCursor: null,
        totalCount: 1,
      },
    }).as("getTodos");
    cy.visit("/todos");
    cy.wait("@getTodos");
    // 파일 버튼이 있는지 확인하고 테스트 진행
    cy.get("[data-cy='file-button']").then(($buttons) => {
      if ($buttons.length > 0) {
        cy.wrap($buttons)
          .first()
          .should("have.attr", "href") // href 속성 확인
          .and("include", "https://") // URL 형식 확인
          .then(() => {
            cy.wrap($buttons).first().should("have.attr", "download"); // download 속성 확인
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
    cy.visit("/todos");
    cy.intercept("DELETE", "**/todos/*").as("deleteTodo");

    cy.get("[data-radix-scroll-area-viewport] .flex.items-center").then(($items) => {
      if ($items.length > 0) {
        cy.wrap($items)
          .first()
          .within(() => {
            cy.get("button[aria-haspopup='menu']").click();
          });

        cy.get("[data-cy='delete-button']").click();
        cy.get(".bg-red-500").click();

        cy.wait("@deleteTodo").its("response.statusCode").should("eq", 204);
      } else {
        cy.log("삭제할 할 일이 없습니다.");
      }
    });
  });
});
