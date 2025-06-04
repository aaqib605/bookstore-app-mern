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

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book", error });
  }
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { title, author, publishYear } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        publishYear,
      },
      { new: true }
    );

    return res.status(201).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: "Error updating book", error });
  }
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
