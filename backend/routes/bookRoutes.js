import express from "express";
import { GoogleGenAI } from "@google/genai";

import { Book } from "../models/bookModel.js";

const router = express.Router();
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function buildBookSummaryPrompt(book) {
  return `Write a crisp, spoiler-free summary of this book in 2 to 3 sentences.

Title: ${book.title}
Author: ${book.author}
Published year: ${book.publishYear}`;
}

async function generateBookSummary(book) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const interaction = await ai.interactions.create({
    model: GEMINI_MODEL,
    input: buildBookSummaryPrompt(book),
  });

  return interaction.output_text?.trim();
}

router.get("/", async (req, res) => {
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

router.get("/:id/summary", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const summary = await generateBookSummary(book);

    if (!summary) {
      return res.status(502).json({ message: "No summary was generated" });
    }

    return res.status(200).json({ summary });
  } catch (error) {
    console.log("Error generating book summary:", error);

    return res.status(500).json({
      message: "Error generating book summary",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { title, author, publishYear, notes = "" } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        publishYear,
        notes,
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

router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear, notes = "" } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = await Book.create({ title, author, publishYear, notes });

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

router.delete("/:id", async (req, res) => {
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

export default router;
