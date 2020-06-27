const router = require("express").Router({ mergeParams: true });
const Course = require("../models/course");
const Student = require("../models/student");
const isLoggedIn = require("../middleware/auth-middleware").isLoggedIn;

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

                    // Check if student has course
                    if (student.courses.indexOf(course._id) !== -1) {
                        console.log(`Student(${student.first}) already enrolled in Course(${course.name})`);
                    } else {
                        student.courses.push(course);
                        student.save();
                    }

                    // Check if course has student
                    if (course.students.indexOf(student._id) !== -1) {
                        console.log(`Course(${course.name}) already has Student(${student.first})`);
                    } else {
                        course.students.push(student);
                        course.save();
                    }

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

module.exports = router;