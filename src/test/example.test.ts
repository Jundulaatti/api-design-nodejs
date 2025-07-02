import request from "supertest";
import app from "../server";

describe("Example Test", () => {
  it("should send back 'Hello' message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Hello" });
  });
});
