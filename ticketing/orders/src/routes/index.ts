import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/orders", async (_: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as indexOrderRouter };
