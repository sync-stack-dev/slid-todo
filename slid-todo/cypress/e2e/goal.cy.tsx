describe("goal 페이지 테스트", () => {
  let goalId: string;
  beforeEach(() => {
    const API_URL = "https://sp-slidtodo-api.vercel.app";
    const TEAM_ID = Cypress.env("TEAM_ID");

    if (!TEAM_ID) {
      throw new Error("TEAM_ID is not set in environment variables");
    }

    Cypress.config("defaultCommandTimeout", 1000);
    Cypress.config("pageLoadTimeout", 1000);
    Cypress.config("requestTimeout", 1000);

    cy.intercept({
      method: "POST",
      url: "**/auth/login",
    }).as("loginRequest");

    cy.intercept("GET", `${API_URL}/${TEAM_ID}/todos**`).as("getTodos");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/login", { timeout: 3000 });

    const testEmail = Cypress.env("TEST_EMAIL");
    const testPassword = Cypress.env("TEST_PASSWORD");

    if (!testEmail || !testPassword) {
      throw new Error("Test credentials are not set in environment variables");
    }

    console.log("TEAM_ID:", TEAM_ID);
    console.log("TEST_EMAIL:", testEmail);

    cy.get('input[placeholder="이메일을 입력해 주세요"]')
      .should("be.visible", { timeout: 1000 })
      .type(testEmail, { delay: 10 });

    cy.get("[role='password']")
      .should("be.visible", { timeout: 1000 })
      .type(testPassword, { delay: 10 });

    cy.get("[data-cy='login-button']").should("be.visible", { timeout: 1000 }).click();

    cy.wait("@loginRequest", { timeout: 1000 }).then((interception) => {
      console.log("Login Response:", interception.response);
      expect(interception.response?.statusCode).to.eq(201);
    });

    cy.url().should("include", "/", { timeout: 1000 });

    cy.wait("@loginRequest")
      .its("response.statusCode")
      .should("eq", 201)
      .then(() => {
        cy.request({
          method: "POST",
          url: `${API_URL}/${TEAM_ID}/goals`,
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            title: "test",
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          goalId = response.body.id;
        });
      });
  });

  it("goals 페이지 접속 확인", () => {
    cy.visit("/goals");
  });
});
