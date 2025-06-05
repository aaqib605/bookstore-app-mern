import { Route, Routes } from "react-router";

import HomePage from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import BookDetails from "./pages/BookDetails";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

export default function App() {
  return (
    <main className="container mx-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<BookDetails />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </main>
  );
}
