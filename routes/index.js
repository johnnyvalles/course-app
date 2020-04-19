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
    });

    switch (req.body.major.toLowerCase()) {
        case "cs":
            newStudent.major = "Computer Science";
        break;
        case "cse":
            newStudent.major = "Computer Science & Engineer";
        break;
        case "ce":
            newStudent.major = "Computer Engineering";
        break;
        case "ele":
            newStudent.major = "Electrical Engineering";
        break;
        case "se":
            newStudent.major = "Software Engineering";
        break;
        case "cgs":
            newStudent.major = "Computer Game Science";
        case "inf":
            newStudent.major = "Informatics";
        break;
        case "oth":
            newStudent.major = "Other";
        break;
        default:
            newStudent.major = undefined; // Set to undefined for db default.
        break;
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