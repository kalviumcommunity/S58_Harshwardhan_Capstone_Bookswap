const express = require('express');
const connectDB = require('./config/db');
const Joi = require('joi')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const booksModel = require("./model/books.model");

app.use(express.json());

connectDB();

//validation schema with joi
const bookSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
})

//Get book images endpoint
app.get("/Books/Get", async (req, res) => {
  try {
    let result = await booksModel.find();
    res.send({ msg: "Fetched the data successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Post book images endpoint
app.post("/Books/Post", async (req, res) => {

  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    let book = new booksModel(req.body);
    let result = await book.save();
    res.send({ msg: "Data saved successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});