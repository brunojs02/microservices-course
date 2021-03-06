import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/api/orders/:id", async (_: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as deleteOrderRouter };
