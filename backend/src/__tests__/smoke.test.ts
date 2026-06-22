import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("App smoke tests", () => {
  it("should export an express app", () => {
    expect(app).toBeDefined();
    expect(typeof app).toBe("function");
  });

  it("should have /api/health endpoint mounted", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("healthy");
  });

  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/nonexistent");
    expect(res.status).toBe(404);
  });
});
