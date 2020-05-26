import request from "supertest";

import { app } from "../../app";

it("get authenticated user informations", async () => {
  const email = "bruno@example.com";
  const password = "1234";
  const cookies = await global.signup(email, password);
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookies)
    .expect(200);

  expect(response.body.currentUser.email).toEqual(email);
});

it("responds with null if the user is not authenticated", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);

  expect(response.body.currentUser).toBeUndefined();
});
