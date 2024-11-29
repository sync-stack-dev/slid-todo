describe("todos 페이지 테스트", () => {
  let sharedGoalId: string;
  beforeEach(() => {
    const API_URL = "https://sp-slidtodo-api.vercel.app";
    const TEAM_ID = Cypress.env("TEAM_ID");

    if (!TEAM_ID) {
      throw new Error("TEAM_ID is not set in environment variables");
    }

    Cypress.config("defaultCommandTimeout", 5000);
    Cypress.config("pageLoadTimeout", 5000);
    Cypress.config("requestTimeout", 5000);

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
      .should("be.visible", { timeout: 5000 })
      .type(testEmail, { delay: 10 });

    cy.get("[role='password']")
      .should("be.visible", { timeout: 5000 })
      .type(testPassword, { delay: 10 });

    cy.get("[data-cy='login-button']").should("be.visible", { timeout: 5000 }).click();

    cy.wait("@loginRequest", { timeout: 5000 }).then((interception) => {
      console.log("Login Response:", interception.response);
      expect(interception.response?.statusCode).to.eq(201);
    });

    cy.url().should("include", "/", { timeout: 5000 });
  });

  it("페이지 방문 및 목표 생성", () => {
    cy.intercept("POST", "**/goals").as("createGoal");

    cy.visit("/todos");

    cy.get("[data-cy='create-goal-button']").should("be.visible", { timeout: 5000 });
    cy.get("[data-cy='create-goal-button']").click();
    cy.get("[data-cy='form-modal']").should("be.visible", { timeout: 5000 });
    cy.get("[data-cy='form-modal-title']").should("be.visible", { timeout: 5000 }).click();
    cy.get("[data-cy='form-modal-title']").type("테스트 목표 생성");
    cy.get("[data-cy='form-modal-submit-button']").should("be.visible", { timeout: 5000 }).click();

    cy.wait("@createGoal").then((interception) => {
      sharedGoalId = interception.response?.body.id;
      expect(sharedGoalId).to.exist;
      cy.visit(`/goals/${sharedGoalId}`);
      cy.url().should("include", `/goals/${sharedGoalId}`);
    });
  });

  it("수정 테스트", () => {
    cy.intercept("PATCH", `**/goals/${sharedGoalId}`).as("updateGoal");

    cy.visit(`/goals/${sharedGoalId}`);

    cy.wait(1000);

    cy.get("[data-cy='more-button']").should("be.visible", { timeout: 10000 }).click();
    cy.get("[data-cy='edit-button']").should("be.visible", { timeout: 5000 }).click();

    cy.get("[data-cy='form-modal-title']")
      .should("be.visible", { timeout: 5000 })
      .clear()
      .type("수정된 목표xudsnsdfsd");

    cy.get("[data-cy='form-modal-submit-button']").click();

    cy.wait("@updateGoal").its("response.statusCode").should("eq", 200);

    cy.get("[data-cy='goal-title']")
      .should("be.visible", { timeout: 5000 })
      .should("have.text", "수정된 목표xudsnsdfsd");
  });
});
