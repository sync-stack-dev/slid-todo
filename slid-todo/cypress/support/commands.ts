Cypress.Commands.add("setLoginCookies", (accessToken, refreshToken) => {
  cy.setCookie("accessToken", accessToken as string);
  cy.setCookie("refreshToken", refreshToken as string);
});
