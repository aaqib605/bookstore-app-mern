import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import { Book } from "./models/bookModel.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the backend server of bookstore!</h1>");
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = await Book.create({ title, author, publishYear });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
