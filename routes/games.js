const { Router } = require("express");
const Games = require("../models/games");
const router = Router();

router.get("/", async (req, res) => {
  const games = await Games.getAll();
  res.render("games", {
    title: "Games",
    activeGames: true,
    games
  });
});

module.exports = router;
