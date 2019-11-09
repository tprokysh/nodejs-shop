const { Router } = require("express");
const Card = require("../models/card");
const Games = require("../models/games");
const path = require("path");
const router = Router();

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  console.log(card);

  res.render("card", {
    card
  });
});

router.post("/buy", async (req, res) => {
  const game = await Games.getById(req.body.id);
  console.log(game);

  await Card.add(game);
  res.redirect("/card");
});

module.exports = router;
