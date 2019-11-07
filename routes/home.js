const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    activeHome: true
  });
});

module.exports = router;
