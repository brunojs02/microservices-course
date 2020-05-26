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
