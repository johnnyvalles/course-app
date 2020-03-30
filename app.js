const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const Person = require("./models/person");
const Assignment = require("./models/assignment");
const seedDB = require("./fakerseeds");


// ***********************************************************
// Express Configuration
// ***********************************************************
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// ***********************************************************


// ***********************************************************
// Mongoose Configuration
// ***********************************************************
mongoose.connect('mongodb://localhost:27017/gradebook_app',
    { useNewUrlParser: true, useUnifiedTopology: true });

seedDB();
// ***********************************************************


// ***********************************************************
// RESTful Routes (students)
// ***********************************************************

// Redirect ROOT to HOMEPAGE
app.get("/", (req, res) => {
    res.render("home");
});

// INDEX
app.get("/students", (req, res) => {
    Person.find({}, (err, people) => {
        if (err) {
            console.log(err);
        } else {
            res.render("persons/index", { people: people });
        }
    });
});

// NEW
app.get("/students/new", (req, res) => {
    res.render("persons/new");
});

// CREATE
app.post("/students", (req, res) => {
    Person.create(req.body.person, (err, newPerson) => {
        if (err) {
            console.log(err);
         } else {
            res.redirect("/students");
         }
    });
});

// SHOW
app.get("/students/:id", (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err);
        } else {
            res.render("persons/show", { person: person });
        }
    });
});

// EDIT
app.get("/students/:id/edit", (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err);
        } else {
            res.render("persons/edit", { person: person });
        }
    });
});

// UPDATE
app.put("/students/:id", (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body.person, (err, updated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/students/${req.params.id}`);
        }
    });
});

// DELETE
app.delete("/students/:id", (req, res) => {
    Person.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/students");
        }
    });
});
// ***********************************************************


// ***********************************************************
// RESTful Routes (assignments)
// ***********************************************************

// INDEX
app.get("/assignments", (req, res) => {
    Assignment.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/index", { docs: docs });
        }
    });
});

// NEW
app.get("/assignments/new", (req, res) => {
    res.render("assignments/new");
});

// CREATE
app.post("/assignments", (req, res) => {
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
app.get("/assignments/:id", (req, res) => {
    Assignment.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/show", { doc: doc });
        }
    });
});

// EDIT
app.get("/assignments/:id/edit", (req, res) => {
    Assignment.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.render("assignments/edit", { doc: doc });
        }
    });
});

// UPDATE
app.put("/assignments/:id", (req, res) => {
    Assignment.findByIdAndUpdate(req.params.id, req.body.doc, (err, updated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/assignments/${req.params.id}`);
        }
    });
});

// DELETE
app.delete("/assignments/:id", (req, res) => {
    Assignment.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/assignments");
        }
    });
});
// ***********************************************************

let run_app = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on localhost:${run_app.address().port}`);
});