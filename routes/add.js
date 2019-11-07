const { Router } = require("express");
const fileupload = require("express-fileupload");
const Games = require("../models/games");
const router = Router();

router.use(fileupload());

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add Game",
    activeAdd: true
  });
});

router.post("/", async (req, res) => {
  //console.log(req.body);
  const games = new Games(req.body.title, req.body.price, req.files);

  await games.save();
  res.status(200);
  res.redirect("/games");
});

module.exports = router;
