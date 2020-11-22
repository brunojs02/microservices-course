import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  requestValidation,
} from "@mscticketing/common/build/middlewares";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("ticketId must be provided")],
  requestValidation,
  async (_: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createOrderRouter };
