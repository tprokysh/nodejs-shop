const path = require("path");
const fse = require("fs-extra");

const pathToData = path.join(__dirname, "..", "data", "cart.json");

class Cart {
  static async add(game) {
    const cart = await this.fetch();

    const id = cart.games.findIndex((id) => id.id === game.id);

    const gameInCart = cart.games[id];

    if (gameInCart) {
      gameInCart.count++;
    } else {
      game.count = 1;
      cart.games.push(game);
    }

    cart.price += +game.price;

    return new Promise((resolve, reject) => {
      fse.writeFile(pathToData, JSON.stringify(cart), (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fse.readFile(pathToData, "utf-8", (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  }

  static async deleteGame(id) {
    const cart = await Cart.fetch();

    const ident = cart.games.findIndex((ident) => ident.id == id);
    const game = cart.games[ident];

    if (game.count === 1) {
      cart.games = cart.games.filter((cart) => cart.id !== id);
    } else {
      cart.games[ident].count--;
    }

    cart.price -= game.price;

    return new Promise((resolve, reject) => {
      fse.writeFile(pathToData, JSON.stringify(cart), (err) => {
        if (err) reject(err);
        resolve(cart);
      });
    });
  }
}

module.exports = Cart;
