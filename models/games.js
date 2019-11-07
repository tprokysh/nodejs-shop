const uuid = require("uuid/v4");
const fse = require("fs-extra");
const path = require("path");

class Games {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  async save() {
    let file = this.img.file;
    let filename = file.name;
    file.mv("./public/img/" + filename);

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

  toJson() {
    return {
      title: this.title,
      price: this.price,
      img: "img/" + this.img.file.name,
      id: this.id
    };
  }
}

module.exports = Games;
