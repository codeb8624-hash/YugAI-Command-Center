import { describe, it, expect } from "vitest";

describe("Frontend smoke tests", () => {
  it("should have basic math working", () => {
    expect(1 + 1).toBe(2);
  });

  it("should have vitest configured", () => {
    expect(typeof describe).toBe("function");
    expect(typeof it).toBe("function");
  });
});
