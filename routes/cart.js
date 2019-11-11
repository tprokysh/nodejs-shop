const { Router } = require("express");
const Games = require("../models/games");
const path = require("path");
const router = Router();

function calcPrice(cart) {
  let price = 0;

  return cart.reduce((total, games) => {
    return (price += games.gameId.price * games.count);
  }, 0);
}

router.get("/", async (req, res) => {
  const user = await req.user.populate("cart.games.gameId").execPopulate();

  res.render("cart", {
    activeCart: true,
    cart: user.cart.games,
    calcPrice: calcPrice(user.cart.games)
  });
});

router.post("/buy", async (req, res) => {
  const game = await Games.findById(req.body.id);

  await req.user.addGame(game);

  res.redirect("/cart");
});

router.delete("/delete/:id", async (req, res) => {
  const cart = await Cart.deleteGame(req.params.id);

  res.status(200).json(cart);
});

module.exports = router;
