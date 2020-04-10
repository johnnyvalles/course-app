const router = require("express").Router({ mergeParams: true });
const Student = require("../models/student");

router.use(isLoggedIn);

// INDEX
router.get("/", (req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
            console.log(err);
        } else {
            res.render("students/index", { students: students });
        }
    });
});

// NEW
router.get("/new", (req, res) => {
    res.render("students/new");
});

// CREATE
router.post("/", (req, res) => {
    Student.create(req.body.student, (err, newStudent) => {
        if (err) {
            console.log(err);
         } else {
            res.redirect("/students");
         }
    });
});

// SHOW
router.get("/:id", (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (err) {
            console.log(err);
        } else {
            res.render("students/show", { student: student });
        }
    });
});

// EDIT
router.get("/:id/edit", (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (err) {
            console.log(err);
        } else {
            res.render("students/edit", { student: student });
        }
    });
});

// UPDATE
router.put("/:id", (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body.student, (err, updated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/students/${req.params.id}`);
        }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    Student.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/students");
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