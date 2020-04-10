const router = require("express").Router({ mergeParams: true });
const Course = require("../models/course");

router.use(isLoggedIn);

// Courses Routes
router.get("/", (req, res) => {
    Course.find({}, (err, courses) => {
        if (err) {
            console.log(err);
        } else {
            res.render("courses/index", { courses: courses });
        }
    });
});

router.get("/:id", (req, res) => {
    Course.findById(req.params.id, (err, course) => {
        if (err) {
            console.log(err);
        } else {
            res.render("courses/show", { course: course });
        }
    });
});

router.put("/:id", (req, res) => {
    // Updates the courses roster by enrolling a new student
    res.send("COURSES: UPDATE");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;