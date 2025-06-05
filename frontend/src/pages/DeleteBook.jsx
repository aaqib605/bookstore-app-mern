import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  async function handleDeleteBook() {
    setLoading(true);

    try {
      await axios.delete(`http://localhost:8000/books/${id}`);

      setLoading(false);

      toast.success("Book deleted successfully");

      navigate("/");
    } catch (error) {
      toast.error("Error deleting book");

      console.log("Error deleting book:", error);
    } finally {
      setLoading(false);

      navigate("/");
    }
  }

  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Delete Book</h1>

      {loading ? <Spinner /> : ""}

      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full cursor-pointer"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}
