import request from "supertest";
import { app } from "../../app";

const createTicket = (title: string, price: number) => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });
};

it("can fetch a list of tickets", async () => {
  await createTicket("lasdhkd", 10);
  await createTicket("ralkçfnas", 20);
  await createTicket("laskhdalkd", 16);
  await createTicket("çqwrkhlçk", 32);

  const { body: tickets } = await request(app).get("/api/tickets").expect(200);

  expect(tickets.length).toEqual(4);
});
