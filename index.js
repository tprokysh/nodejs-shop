const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const homeRoute = require("./routes/home");
const addRoute = require("./routes/add");
const gamesRoute = require("./routes/games");
const cartRoute = require("./routes/cart");
const mongoose = require("mongoose");
const User = require("./models/users");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});
app.use(async (req, res, next) => {
  console.log("!!!!!!!!");

  try {
    const user = await User.findById("5dc97794d95bb559de44d807");
    req.user = user;
    console.log(req.user);

    next();
  } catch (err) {
    console.log(err);
  }
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/add", addRoute);
app.use("/games", gamesRoute);
app.use("/cart", cartRoute);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url = `mongodb+srv://tal:2356945t@cluster0-iimrd.mongodb.net/nodejs-shop`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    const user = await User.findOne();
    console.log(user);

    if (!user) {
      const user = new User({
        mail: "prokish.tal@icloud.com",
        name: "Tal",
        cart: { games: [] }
      });
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
