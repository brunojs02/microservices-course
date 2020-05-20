import { Request, Response, NextFunction } from "express";

export const errorHanlder = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).send({ message: "Something is wrong" });
};
