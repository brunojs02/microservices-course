import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotFoundError,
  NotAuthorizedError,
} from "@mscticketing/common/build/errors";
import {
  requireAuth,
  requestValidation,
} from "@mscticketing/common/build/middlewares";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is requried"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and greater than 0"),
  ],
  requestValidation,
  async (req: Request, res: Response) => {
    const { body, params, currentUser } = req;
    const { id } = params;
    const { title, price } = body;
    const { id: userId } = currentUser!;
    const ticket = await Ticket.findById(id);

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== userId) throw new NotAuthorizedError();

    ticket.set({ title, price });
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
