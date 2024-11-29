/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Sets the login cookies for authentication.
     * @param accessToken - The access token to set.
     * @param refreshToken - The refresh token to set.
     */
    setLoginCookies(accessToken: string, refreshToken: string): Chainable<void>;
  }
}
