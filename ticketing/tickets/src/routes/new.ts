import { body } from "express-validator";
import express, { Request, Response } from "express";
import {
  requireAuth,
  requestValidation,
} from "@mscticketing/common/build/middlewares";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is requried"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  requestValidation,
  async (req: Request, res: Response) => {
    const { body, currentUser } = req;
    const { id: userId } = currentUser!;
    const { title, price } = body;
    const ticket = Ticket.build({ price, title, userId });
    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
