import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import requireAuth from "@ticketsjohn/common/build/middleware/require-auth";
const app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.get("/api/tickets", requireAuth, (req, res) => {
  res.status(200).json("hello world");
});
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("no secret");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("no mongo secret");
  }
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.listen(3000, () => {
  console.log("app listening to port 3000");
  start();
});
