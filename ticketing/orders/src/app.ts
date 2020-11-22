import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NotFoundError } from "@mscticketing/common/build/errors";
import {
  currentUser,
  errorHanlder,
} from "@mscticketing/common/build/middlewares";
import { showOrderRouter } from "./routes/show";
import { createOrderRouter } from "./routes/new";
import { indexOrderRouter } from "./routes/index";
import { deleteOrderRouter } from "./routes/delete";

const app = express();
const secure = process.env.NODE_ENV !== "test";

app.set("trust proxy", true);

app.use(json());
app.use(cookieSession({ signed: false, secure }));
app.use(currentUser);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(createOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHanlder);

export { app };
