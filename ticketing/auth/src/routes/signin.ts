import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";

import { User } from "../models/user";
import { Password } from "../services/password";
import { BadRequestError } from "../errors/bad-request-error";
import { requestValidation } from "../middlewares/request-validation";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be supplied"),
  ],
  requestValidation,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Bad credentials");
    }

    const match = await Password.compare(user.password, password);

    if (!match) {
      throw new BadRequestError("Bad credentials");
    }

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
