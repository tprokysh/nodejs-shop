const { Schema, model } = require("mongoose");

const games = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  }
});

module.exports = model("Games", games);
