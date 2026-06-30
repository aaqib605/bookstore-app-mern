import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";

import BookCard from "../components/BookCard";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) => {
    const searchValue = searchTerm.trim().toLowerCase();

    return (
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue)
    );
  });

  useEffect(() => {
    setLoading(true);

    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:8000/books");

        setBooks(response.data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:border-sky-600"
      />
      {loading ? (
        <Spinner />
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">No matching books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
