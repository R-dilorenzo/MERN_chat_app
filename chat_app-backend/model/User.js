const mongoose = require("mongoose");

//creo lo schema di User (table user)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  photo: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//definisco il model User e associo a questo lo schema creato con userSchema
module.exports = mongoose.model("User", userSchema);
