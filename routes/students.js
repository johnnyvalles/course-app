const router = require("express").Router({ mergeParams: true });
const Person = require("../models/person");

// INDEX
router.get("/students", (req, res) => {
    Person.find({}, (err, people) => {
        if (err) {
            console.log(err);
        } else {
            res.render("persons/index", { people: people });
        }
    });
});

// NEW
router.get("/students/new", (req, res) => {
    res.render("persons/new");
});

// CREATE
router.post("/students", (req, res) => {
    Person.create(req.body.person, (err, newPerson) => {
        if (err) {
            console.log(err);
         } else {
            res.redirect("/students");
         }
    });
});

// SHOW
router.get("/students/:id", (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err);
        } else {
            res.render("persons/show", { person: person });
        }
    });
});

// EDIT
router.get("/students/:id/edit", (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err);
        } else {
            res.render("persons/edit", { person: person });
        }
    });
});

// UPDATE
router.put("/students/:id", (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body.person, (err, updated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/students/${req.params.id}`);
        }
    });
});

// DELETE
router.delete("/students/:id", (req, res) => {
    Person.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/students");
        }
    });
});

module.exports = router;