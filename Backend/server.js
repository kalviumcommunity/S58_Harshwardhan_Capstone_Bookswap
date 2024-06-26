const express = require('express');
const connectDB = require('./config/db');
const Joi = require('joi')
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const booksModel = require("./model/books.model");
const usersModel = require("./model/user.model");

app.use(express.json());
app.use(cors());

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
    username: Joi.string().required(),
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
    res.send({ msg: "User created successfully", user: { id: user._id, username: user.username, email: user.email, password: user.password } });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { error } = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    console.log('Validation error:', error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  try {
    console.log('Login request received for username:', req.body.username);
    const user = await usersModel.findOne({ username: req.body.username, password: req.body.password });

    if (user) {
      console.log('User found:', user.username);
      res.cookie('username', user.username, { maxAge: 900000, httpOnly: true });
      res.status(200).send({ msg: 'Login successful' });
    } else {
      console.log('Invalid username or password');
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred while logging in');
  }
});
// Logout endpoint
app.get("/Users/Logout", (req, res) => {
  res.clearCookie('username', { path: '/' });
  res.send({ msg: "Logged out successfully" });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});