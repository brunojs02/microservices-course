import request from "supertest";

import { app } from "../../app";

it("return 201 on success signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "123456" })
    .expect(201);
});

it("return 400 with a invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example", password: "123455" })
    .expect(400);
});

it("return 400 with a invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "1" })
    .expect(400);
});

it("return 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "123456" })
    .expect(400);
});

it("dissalows duplicated emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "123456" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "123456" })
    .expect(400);
});

it("set cookies after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "123456" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
