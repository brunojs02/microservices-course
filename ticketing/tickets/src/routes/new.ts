import { body } from "express-validator";
import express, { Request, Response } from "express";
import {
  requireAuth,
  requestValidation,
} from "@mscticketing/common/build/middlewares";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is requried"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and greater than 0"),
  ],
  requestValidation,
  async (req: Request, res: Response) => {
    const { body, currentUser } = req;
    const { id: userId } = currentUser!;
    const { title, price } = body;
    const ticket = Ticket.build({ price, title, userId });
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
    });
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
