const mongoose = require("mongoose");

//creating Schema with mongoose
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "minimum 4 characteres"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "minimum 8 characteres"],
  },
  token: {
    type: String,
  },
});

//creating models
const userModel = mongoose.model('user', userSchema)
module.exports = userModel
