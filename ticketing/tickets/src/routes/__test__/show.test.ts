import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns 404 if the ticket is not found", async () => {
  const ticketId = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${ticketId}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const price = 20;
  const title = "jkadhas";

  const { body: createdTicketBody } = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });

  const { body: ticket } = await request(app)
    .get(`/api/tickets/${createdTicketBody.id}`)
    .send()
    .expect(200);

  expect(ticket.title).toEqual(title);
  expect(ticket.price).toEqual(price);
});
