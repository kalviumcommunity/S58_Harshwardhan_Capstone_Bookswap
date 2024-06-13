const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

const usersModel = mongoose.model("userinfo", userSchema);

module.exports = usersModel;