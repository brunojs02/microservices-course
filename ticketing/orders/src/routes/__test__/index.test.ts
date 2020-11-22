import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("fetchs orders from a particular user", async () => {
  const ticketOne = Ticket.build({ title: "Ticket One", price: 20 });
  await ticketOne.save();

  const ticketTwo = Ticket.build({ title: "Ticket Two", price: 34 });
  await ticketTwo.save();

  const ticketThree = Ticket.build({ title: "Ticket Three", price: 40 });
  await ticketThree.save();

  const userOneCookies = global.signin();
  const userTwoCookies = global.signin();

  await request(app)
    .post("/api/orders")
    .set("Cookie", userOneCookies)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwoCookies)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwoCookies)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  const { body: orders } = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwoCookies)
    .send();

  expect(orders.length).toEqual(2);
  expect(orders[0].id).toEqual(orderOne.id);
  expect(orders[1].id).toEqual(orderTwo.id);
  expect(orders[0].ticket.id).toEqual(ticketTwo.id);
  expect(orders[1].ticket.id).toEqual(ticketThree.id);
});
