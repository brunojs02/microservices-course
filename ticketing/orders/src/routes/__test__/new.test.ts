import request from "supertest";
import { Types } from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("returns 401 if the user is not signed in", async () => {
  const ticketId = Types.ObjectId().toHexString();
  await request(app).post("/api/orders").send({ ticketId }).expect(401);
});

it("returns 400 if the ticketId is not provided", async () => {
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({})
    .expect(400);
});

it("returns a error if the ticket does not exist", async () => {
  const ticketId = Types.ObjectId().toHexString();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns a error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({ price: 35, title: "Ticket test" });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "kjahsdkajsh",
    expiresAt: new Date(),
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({ price: 35, title: "Ticket test" });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it("reserves a ticket even a order already exist but the status is cancelled", async () => {
  const ticket = Ticket.build({ price: 35, title: "Ticket test" });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "kjahsdkajsh",
    expiresAt: new Date(),
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo("emits an order created event");
