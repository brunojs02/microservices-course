import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NotFoundError } from "@mscticketing/common/build/errors";
import { errorHanlder } from "@mscticketing/common/build/middlewares";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHanlder);

export { app };
