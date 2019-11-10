const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const homeRoute = require("./routes/home");
const addRoute = require("./routes/add");
const gamesRoute = require("./routes/games");
const cardRoute = require("./routes/card");
const mongoose = require("mongoose");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/add", addRoute);
app.use("/games", gamesRoute);
app.use("/card", cardRoute);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url = `mongodb+srv://tal:2356945t@cluster0-iimrd.mongodb.net/test?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
