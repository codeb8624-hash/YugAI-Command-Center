import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("POST /api/contact", () => {
  const validPayload = {
    name: "Test User",
    email: "test@example.com",
    subject: "Test Subject",
    message: "This is a test message.",
  };

  it("should accept a valid contact submission", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send(validPayload)
      .expect("Content-Type", /json/);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.createdAt).toBeDefined();
  });

  it("should return 400 when name is missing", async () => {
    const { name, ...noName } = validPayload;
    const res = await request(app)
      .post("/api/contact")
      .send(noName)
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toMatch(/name/i);
  });

  it("should return 400 when email is invalid", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validPayload, email: "not-an-email" })
      .expect(400);

    expect(res.body.success).toBe(false);
  });

  it("should return 400 when message is empty", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validPayload, message: "" })
      .expect(400);

    expect(res.body.success).toBe(false);
  });

  it("should return 429 when rate limit is exceeded", async () => {
    const requests = Array.from({ length: 6 }, () =>
      request(app)
        .post("/api/contact")
        .send(validPayload)
    );

    const results = await Promise.all(requests);
    const tooMany = results.find((r) => r.status === 429);
    expect(tooMany).toBeDefined();
  });
});
