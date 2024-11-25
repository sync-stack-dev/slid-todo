import { mount } from "cypress/react18";
import "./commands";
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

Cypress.Commands.add("mount", mount);
