const express = require("express");
const exphbs = require("express-handlebars");
const homeRoute = require("./routes/home");
const addRoute = require("./routes/add");
const gamesRoute = require("./routes/games");
const cardRoute = require("./routes/card");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/add", addRoute);
app.use("/games", gamesRoute);
app.use("/card", cardRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
