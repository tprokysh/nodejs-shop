const path = require("path");
const fse = require("fs-extra");

const pathToData = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(game) {
    const card = await this.fetch();

    const id = card.games.findIndex((id) => id.id === game.id);
    console.log(id);

    const gameInCard = card.games[id];
    console.log(gameInCard);

    if (gameInCard) {
      gameInCard.count++;
      //card.games.push(game);
    } else {
      game.count = 1;
      card.games.push(game);
    }

    card.price += +game.price;

    return new Promise((resolve, reject) => {
      fse.writeFile(pathToData, JSON.stringify(card), (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static async fetch() {
    //console.log(pathToData);

    return new Promise((resolve, reject) => {
      fse.readFile(pathToData, "utf-8", (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  }

  static async deleteGame(id) {
    const card = await Card.fetch();

    //console.log(id);

    const ident = card.games.findIndex((ident) => ident.id == id);
    const game = card.games[ident];
    //console.log(ident);

    if (game.count === 1) {
      card.games = card.games.filter((card) => card.id !== id);
    } else {
      card.games[ident].count--;
    }

    console.log(card.price);

    card.price -= game.price;
    console.log(card.price);

    return new Promise((resolve, reject) => {
      fse.writeFile(pathToData, JSON.stringify(card), (err) => {
        if (err) reject(err);
        resolve(card);
      });
    });
  }
}

module.exports = Card;
