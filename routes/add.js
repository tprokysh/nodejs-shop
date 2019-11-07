const { Router } = require("express");
const fileupload = require("express-fileupload");
const Course = require("../models/games").Course;
const router = Router();

router.use(fileupload());

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add Game",
    activeAdd: true
  });
});

router.post("/", (req, res) => {
  //console.log(req.body);
  const games = new Course(req.body.title, req.body.price, req.files);

  games.save();

  res.redirect("/games");
});

module.exports = router;
