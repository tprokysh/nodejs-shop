const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("games", {
    title: "Games",
    activeGames: true
  });
});

module.exports = router;
