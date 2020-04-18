const router = require("express").Router({ mergeParams: true });
const passport = require("passport");
const Student = require("../models/student");
const Course = require("../models/course");

router.get("/", isLoggedIn, (req, res) => {
    res.render("dashboard");
});

router.get("/home", isLoggedIn, (req, res) => {
    res.redirect("/");
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
    let newStudent = new Student({ 
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        username: req.body.username,
        studentId: req.body.studentId,
        major: req.body.major
    });

    if (!newStudent.major) {
        newStudent.major = undefined;
    }

    Student.register(newStudent, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        }

        passport.authenticate("local")(req, res, () => {
            res.redirect("/home");
        });
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;