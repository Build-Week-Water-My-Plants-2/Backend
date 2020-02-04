const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone_number: {
    type: Number,
    required: true
  }
});

module.exports = user = mongoose.model("users", UserSchema);
