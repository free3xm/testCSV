const { Schema, model } = require("mongoose");

const schema = new Schema({
  user_email: String,
  date: String,
  value: String,
  currency: String,
  status: String
});

module.exports = model("Order", schema)
