import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function CreateBook() {
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSaveBook() {
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/books", bookDetails);
    } catch (error) {
      console.log("Error adding book:", error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Add new book</h1>

      {loading ? <Spinner /> : ""}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={bookDetails.title}
            onChange={(e) => handleInputChange(e)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-700" htmlFor="author">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            value={bookDetails.author}
            onChange={(e) => handleInputChange(e)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-700" htmlFor="publishYear">
            Publish Year
          </label>
          <input
            id="publishYear"
            type="number"
            name="publishYear"
            value={bookDetails.publishYear}
            onChange={(e) => handleInputChange(e)}
            className="border-2 border-gray-500 px-4 py-2  w-full"
          />
        </div>

        <button
          className="p-2 bg-sky-300 m-8 cursor-pointer"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
}
