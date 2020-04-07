const router = require("express").Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/person");

router.get("/", (req, res) => {
    res.redirect("/home");
});

router.get("/home", (req, res) => {
    res.render("home");
});

// Auth Routes
router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

router.post("/login", 
    passport.authenticate("local", { successRedirect: "/home", failureRedirect: "/login" }), 
    (req, res) => {}
);

router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        }

        passport.authenticate("local")(req, res, () => {
            res.redirect("/home");
        });
    });
});

module.exports = router;