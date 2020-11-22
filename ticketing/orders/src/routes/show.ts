import express, { Request, Response } from "express";
import {
  NotFoundError,
  NotAuthorizedError,
} from "@mscticketing/common/build/errors";
import { requireAuth } from "@mscticketing/common/build/middlewares";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { params, currentUser } = req;
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("ticket");

    if (!order) throw new NotFoundError();

    if (order.userId !== currentUser!.id) throw new NotAuthorizedError();

    res.send(order);
  }
);

export { router as showOrderRouter };
