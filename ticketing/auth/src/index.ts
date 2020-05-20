import express from "express";
import { json } from "body-parser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";
import { errorHanlder } from "./middlewares/erro-handler";

const app = express();
app.use(json());

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(errorHanlder);

app.listen(3000, () => {
  console.log("Listening on 3000");
});
