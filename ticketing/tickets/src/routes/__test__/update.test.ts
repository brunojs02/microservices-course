import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if provided id does not exist", async () => {
  const ticketId = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", global.signin())
    .send({ title: "kajhd", price: 24 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const ticketId = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .send({ title: "kajhd", price: 24 })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const { body: ticket } = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "aslkdhas", price: 24 });

  await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set("Cookie", global.signin())
    .send({ title: "updated title", price: 25 })
    .expect(401);
});

it("returns a 400 if the user provieds and invalid title or price", async () => {
  const cookies = global.signin();
  const { body: ticket } = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookies)
    .send({ title: "aslkdhas", price: 24 });

  await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set("Cookie", cookies)
    .send({ title: "", price: 25 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set("Cookie", cookies)
    .send({ price: 25 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set("Cookie", cookies)
    .send({ title: "updated title", price: -26 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set("Cookie", cookies)
    .send({ title: "updated title" })
    .expect(400);
});

it("updates the tickets with valid inputs", async () => {
  const cookies = global.signin();
  const { body: ticket } = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookies)
    .send({ title: "aslkdhas", price: 24 });

  const newPrice = 32;
  const newTitle = "updated title";

  await request(app)
    .put(`/api/tickets/${ticket.id}`)
    .set("Cookie", cookies)
    .send({ title: newTitle, price: newPrice })
    .expect(200);

  const { body: updatedTicket } = await request(app)
    .get(`/api/tickets/${ticket.id}`)
    .send();

  expect(updatedTicket.title).toEqual(newTitle);
  expect(updatedTicket.price).toEqual(newPrice);
});
