const router = require("express").Router({ mergeParams: true });
const Assignment = require("../models/assignment");

// INDEX
router.get("/assignments", (req, res) => {
    Assignment.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/index", { docs: docs });
        }
    });
});

// NEW
router.get("/assignments/new", (req, res) => {
    res.render("assignments/new");
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
router.get("/assignments/:id", (req, res) => {
    Assignment.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/show", { doc: doc });
        }
    });
});

// EDIT
router.get("/assignments/:id/edit", (req, res) => {
    Assignment.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/edit", { doc: doc });
        }
    });
});

// UPDATE
router.put("/assignments/:id", (req, res) => {
    Assignment.findByIdAndUpdate(req.params.id, req.body.doc, (err, updated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/assignments/${req.params.id}`);
        }
    });
});

// DELETE
router.delete("/assignments/:id", (req, res) => {
    Assignment.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/assignments");
        }
    });
});

module.exports = router;