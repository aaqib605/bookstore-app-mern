import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";

import Spinner from "./Spinner";

export default function BookModal({ book, onClose }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setSummary("");

      try {
        const response = await axios.get(
          `http://localhost:8000/books/${book._id}/summary`
        );

        setSummary(response.data.summary);
      } catch (error) {
        console.log("Error fetching book summary:", error);
        setSummary("Could not load summary right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [book._id]);

  return (
    <div
      className="fixed bg-black/80 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full min-h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <CiCalendarDate className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.publishYear}</h2>
        </div>
        <div className="my-4 border-t border-gray-200 pt-4">
          {loading ? (
            <Spinner />
          ) : (
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          )}
        </div>
      </div>
    </div>
  );
}
