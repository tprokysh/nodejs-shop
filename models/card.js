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
    console.log(pathToData);

    return new Promise((resolve, reject) => {
      fse.readFile(pathToData, "utf-8", (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  }
}

module.exports = Card;
