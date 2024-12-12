import { expect } from "@jest/globals";

const add = (a: number, b: number) => a + b;

describe("AppSidebar", () => {
  it("test jest", () => {
    expect(add(1, 2)).toBe(3);
  });
});
