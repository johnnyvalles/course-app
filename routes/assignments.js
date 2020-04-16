const router = require("express").Router({ mergeParams: true });
const Assignment = require("../models/assignment");
const Course = require("../models/course");
router.use(isLoggedIn);

// INDEX
router.get("/", (req, res) => {

    Course.findById(req.params.cid, (err, course) => {
        if (err) {
            console.log(err);
        } else {
            Assignment.find({}, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("assignments/index", { docs: docs, courseId: req.params.cid, courseName: course.name });
                }
            });
        }
    });
});

// NEW
router.get("/new", (req, res) => {
    res.render("assignments/new", { courseId: req.params.cid });
});

// CREATE
router.post("/assignments", (req, res) => {
    Assignment.create(req.body.doc, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            res.redirect("/assignments");
        }
    });
});

// SHOW
router.get("/:id", (req, res) => {
    Assignment.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/show", { doc: doc, courseId: req.params.cid });
        }
    });
});

// EDIT
router.get("/:id/edit", (req, res) => {
    Assignment.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/edit", { doc: doc, courseId: req.params.cid });
        }
    });
});

// UPDATE
router.put("/:id", (req, res) => {
    Assignment.findByIdAndUpdate(req.params.id, req.body.doc, (err, updated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/courses/${req.params.cid}/assignments/${req.params.id}`);
        }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    Assignment.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/courses/${req.params.cid}/assignments`);
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