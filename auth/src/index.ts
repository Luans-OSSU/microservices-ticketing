import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import mongoose from "mongoose";

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
