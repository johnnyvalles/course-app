const router = require("express").Router({ mergeParams: true });

// Redirect ROOT to HOMEPAGE
router.get("/", (req, res) => {
    res.render("home");
});

module.exports = router;