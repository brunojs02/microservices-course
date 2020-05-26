import request from "supertest";

import { app } from "../../app";

it("fails when the user doesnt exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "bruno@example.com", password: "1234" })
    .expect(400);
});

it("fails when the email is incorrect", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "1234" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "wrong@example.com", password: "1234" })
    .expect(400);
});

it("fails when the password is incorrect", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "1234" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "bruno@example.com", password: "123456" })
    .expect(400);
});

it("fails when the email and password is incorrect", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "1234" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "wrong@example.com", password: "123456" })
    .expect(400);
});

it("respond with a cookie when the given credentials is valid", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bruno@example.com", password: "1234" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "bruno@example.com", password: "1234" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
