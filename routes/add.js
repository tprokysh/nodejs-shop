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

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add Game",
    activeAdd: true
  });
});

router.post("/", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) throw err;
    console.log(req.user);
    // const games = new Games(req.body.title, req.body.price, req.file.filename);
    const games = new Games({
      title: req.body.title,
      price: req.body.price,
      img: req.file.filename,
      userId: req.user
    });

    try {
      await games.save();
      res.redirect("/games");
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;
