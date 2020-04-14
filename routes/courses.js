const router = require("express").Router({ mergeParams: true });
const Course = require("../models/course");
const Student = require("../models/student");

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

router.post("/:cid/enroll/:sid", isLoggedIn, (req, res) => {
    Course.findById(req.params.cid, (err, course) => {
        if (err) {
            console.log(err);
        } else {
            Student.findById(req.params.sid, (err, student) => {
                if (err) {
                    console.log(err);
                } else {
                    course.students.push(student);
                    student.courses.push(course);
                    course.save();
                    student.save();
                    res.redirect(`/courses/${req.params.cid}`);
                }
            });
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;