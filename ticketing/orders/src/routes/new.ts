import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  requestValidation,
} from "@mscticketing/common/build/middlewares";
import {
  NotFoundError,
  BadRequestError,
} from "@mscticketing/common/build/errors";
import { Ticket } from "../models/ticket";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("ticketId must be provided")],
  requestValidation,
  async (req: Request, res: Response) => {
    const { body, currentUser } = req;
    const { id: userId } = currentUser!;
    const { ticketId } = body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError();

    const isReserved = await ticket.isReserved();

    if (isReserved) throw new BadRequestError("Ticket is already reserved");

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId,
      ticket,
      expiresAt: expiration,
      status: OrderStatus.Created,
    });
    await order.save();

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
