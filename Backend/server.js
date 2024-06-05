const express = require('express');
const connectDB = require('./config/db');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const booksModel = require("./model/books.model");

connectDB();

app.get("/Books/Get", async (req, res) => {
  try {
    let result = await booksModel.find();
    res.send({ msg: "Fetched the data successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});