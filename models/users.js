const { Schema, model } = require("mongoose");

const users = new Schema({
  mail: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cart: {
    games: [
      {
        count: {
          type: Number,
          required: true,
          default: 1
        },
        gameId: {
          type: Schema.Types.ObjectId,
          ref: "Games",
          required: true
        }
      }
    ]
  }
});

users.methods.addGame = function(game) {
  const gamesClone = [...this.cart.games];

  const id = gamesClone.findIndex((id) => {
    return id.gameId.toString() === game._id.toString();
  });

  if (id >= 0) {
    gamesClone[id].count++;
  } else {
    gamesClone.push({
      gameId: game._id,
      count: 1
    });
  }

  this.cart = { games: gamesClone };
  return this.save();
};

module.exports = model("Users", users);
