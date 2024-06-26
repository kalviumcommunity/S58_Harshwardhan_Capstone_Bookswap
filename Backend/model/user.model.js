const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

const usersModel = mongoose.model("userinfos", userSchema);

module.exports = usersModel;