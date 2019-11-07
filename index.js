const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    activeHome: true
  });
});

app.get("/add", (req, res) => {
  res.render("add", {
    title: "Add Game",
    activeAdd: true
  });
});

app.get("/games", (req, res) => {
  res.render("games", {
    title: "Games",
    activeGames: true
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
