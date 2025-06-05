# Bookstore App (MERN)

A full-stack Bookstore application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to create, view, edit, and delete books, with a modern UI and RESTful API.

## Features

- View a list of all books
- Add a new book
- View details of a book
- Edit book information
- Delete a book
- Responsive and modern UI (React + Tailwind CSS)
- RESTful API (Express.js)
- MongoDB Atlas integration

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router, React Toastify
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas

## Project Structure

```
bookstore-app-mern/
├── backend/
│   ├── index.js           # Express server entry point
│   ├── package.json       # Backend dependencies and scripts
│   ├── .env               # Environment variables (not committed)
│   ├── models/
│   │   └── bookModel.js   # Mongoose Book schema
│   └── routes/
│       └── bookRoutes.js  # Book API routes
└── frontend/
    ├── src/
    │   ├── App.jsx        # Main React app
    │   ├── main.jsx       # React entry point
    │   ├── index.css      # Tailwind CSS import
    │   ├── components/    # Reusable UI components
    │   └── pages/         # Page components (CRUD)
    ├── index.html         # HTML template
    └── package.json       # Frontend dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/aaqib605/bookstore-app-mern.git
cd bookstore-app-mern
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following content:

```
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
```

Then start the backend server:

```bash
npm run dev            # Starts backend on http://localhost:8000
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev            # Starts frontend on http://localhost:5173
```

### 4. Open in Browser

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000](http://localhost:8000)

## API Endpoints

- `GET    /books` - Get all books
- `GET    /books/:id` - Get a single book by ID
- `POST   /books` - Create a new book
- `PUT    /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

## Environment Variables

- `PORT` - Port for backend server
- `MONGO_URI` - MongoDB Atlas connection string

## License

This project is licensed under the ISC License.

---

**Author:** Aaqib Javaid
