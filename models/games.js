const uuid = require("uuid/v4");
const fse = require("fs-extra");
const path = require("path");
class Games {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = "img/" + img;
    this.id = uuid();
  }

  toJson() {
    console.log(this.img);

    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    };
  }

  async save() {
    const games = await Games.getAll();

    games.push(this.toJson());

    return new Promise((resolve, reject) => {
      fse.writeFile(
        path.join(__dirname, "..", "data", "games.json"),
        JSON.stringify(games),
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fse.readFile(
        path.join(__dirname, "..", "data", "games.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          resolve(JSON.parse(content));
        }
      );
    });
  }

  static async getById(id) {
    const games = await Games.getAll();
    return games.find((games) => id === games.id);
  }

  static async updateGame(game, filename) {
    game["img"] = "img/" + filename;
    const games = await this.getAll();
    const id = games.findIndex((id) => id.id === game.id);
    games[id] = game;

    return new Promise((resolve, reject) => {
      fse.writeFile(
        path.join(__dirname, "..", "data", "games.json"),
        JSON.stringify(games),
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });

    console.log(id);
  }
}

module.exports = Games;
