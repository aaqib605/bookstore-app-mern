import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/books", booksRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Bookstore!</h1>");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to Bookstore Database");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
