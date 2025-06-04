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

    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    console.log("Error fetching books:", error);

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log("Error fetching book:", error);

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(201).json(updatedBook);
  } catch (error) {
    console.log("Error updating book:", error);

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = await Book.create({ title, author, publishYear });

    if (!newBook) {
      return res.status(500).json({ message: "Error creating book" });
    }

    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book:", error);

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting book:", error);

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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
