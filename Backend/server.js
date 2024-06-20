const express = require('express');
const connectDB = require('./config/db');
const Joi = require('joi')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const booksModel = require("./model/books.model");
const usersModel = require("./model/user.model");

app.use(express.json());

connectDB();

//validation schema with joi
const bookSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
})

//Get books endpoint
app.get("/Books/Get", async (req, res) => {
  try {
    let result = await booksModel.find();
    res.send({ msg: "Fetched the data successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


//Get book by id endpoint
app.get("/Books/Get/:id", async (req, res) => {
  try {
    let result = await booksModel.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ msg: "Book not found" });
    }
    res.send({ msg: "Fetched the data successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Post book endpoint
app.post("/Books/Post", async (req, res) => {

  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const username = req.cookies.username;
  if (!username) {
    return res.status(403).send({ msg: "No username found in cookies. Please login." });
  }

  try {
    let book = new booksModel({
      ...req.body,
      owner: username
    });
    let result = await book.save();
    res.send({ msg: "Data saved successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Update book endpoint
app.put("/Books/Update/:id", async (req, res) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const updatedBook = await booksModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).send({ msg: "Book not found" });
    }
    res.send({ msg: "Book updated successfully", data: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Delete book endpoint
app.delete("/Books/Delete/:id", async (req, res) => {
  try {
    const deletedBook = await booksModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).send({ msg: "Book not found" });
    }
    res.send({ msg: "Book deleted successfully", data: deletedBook });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Sign up endpoint
app.post("/Users/SignUp", async (req, res) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ msg: "User already exists" });
    }
    user = new usersModel(req.body);
    await user.save();
    res.send({ msg: "User created successfully", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Login endpoint
app.get("/Users/Login", async (req, res) => {
  const { name, password } = req.query;
  try {
    const user = await usersModel.findOne({ name: name });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).send({ msg: "Invalid password" });
    }
    res.cookie('username', user.name, { httpOnly: true });
    res.send({ msg: "Logged in successfully", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Logout endpoint
app.get("/Users/Logout", (req, res) => {
  res.clearCookie('username');
  res.send({ msg: "Logged out successfully" });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});