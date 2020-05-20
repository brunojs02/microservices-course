import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";
import { errorHanlder } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHanlder);

app.listen(3000, () => {
  console.log("Listening on 3000");
});
