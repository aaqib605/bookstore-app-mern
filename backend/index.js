import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the backend server of bookstore!</h1>");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
