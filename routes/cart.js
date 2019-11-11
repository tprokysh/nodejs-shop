const { Router } = require("express");
const Games = require("../models/games");
const path = require("path");
const router = Router();

router.get("/", async (req, res) => {
  //const cart = await Cart.fetch();
  //console.log(cart);

  res.render("cart", {
    //cart
  });
});

router.post("/buy", async (req, res) => {
  const game = await Games.findById(req.body.id);
  console.log("GAME", game);
  console.log("REQ.USER", req.user);

  await req.user.addGame(game);
  //console.log(game);

  res.redirect("/cart");
});

router.delete("/delete/:id", async (req, res) => {
  const cart = await Cart.deleteGame(req.params.id);

  res.status(200).json(cart);
});

module.exports = router;
