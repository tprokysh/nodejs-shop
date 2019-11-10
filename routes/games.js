const { Router } = require("express");
const Games = require("../models/games");
const multer = require("multer");
const path = require("path");
const router = Router();
const fse = require("fs-extra");

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
  const games = await Games.find();
  res.render("games", {
    title: "Games",
    activeGames: true,
    games
  });
});

router.get("/:id", async (req, res) => {
  //console.log(req.body);

  const game = await Games.findById(req.params.id);
  res.render("game", game);
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query) return res.redirect("/");
  const game = await Games.findById(req.params.id);
  res.render("edit-game", game);
});

router.post("/delete", async (req, res) => {
  try {
    img = await Games.findById(req.body.id);
    fse.unlink(path.join(__dirname, "..", "public", "img", img.img));

    await Games.deleteOne({
      _id: req.body.id
    });

    res.redirect("/games");
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) throw new Error(err);
    const { id } = req.body;
    delete req.body.id;
    req.body.img = req.file.filename;
    console.log(req.body);

    await Games.findByIdAndUpdate(id, req.body);

    res.redirect("/games");
  });
});

module.exports = router;
