const { Router } = require("express");
const Games = require("../models/games");
const multer = require("multer");
const path = require("path");
const router = Router();

const storage = multer.diskStorage({
  destination: "./public/img",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
}).single("image");

router.get("/", async (req, res) => {
  const games = await Games.getAll();
  res.render("games", {
    title: "Games",
    activeGames: true,
    games
  });
});

router.get("/:id", async (req, res) => {
  console.log(req.body);

  const game = await Games.getById(req.params.id);
  res.render("game", game);
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query) return res.redirect("/");
  const game = await Games.getById(req.params.id);
  res.render("edit-game", game);
});

router.post("/edit", async (req, res) => {
  await upload(req, res, (err) => {
    if (err) throw new Error(err);

    Games.updateGame(req.body, req.file.filename);

    res.redirect("/games");
  });
});

module.exports = router;
