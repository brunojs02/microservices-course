import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NotFoundError } from "@mscticketing/common/build/errors";
import {
  currentUser,
  errorHanlder,
} from "@mscticketing/common/build/middlewares";
import { showTicketRouter } from "./routes/show";
import { createTicketRouter } from "./routes/new";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app = express();
const secure = process.env.NODE_ENV !== "test";

app.set("trust proxy", true);

app.use(json());
app.use(cookieSession({ signed: false, secure }));
app.use(currentUser);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHanlder);

export { app };
