const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

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

const personSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    studentId: { type: String, required: true },
    major: { type: String, required: true },
    bio: { type: String, required: true }
});

const Person = mongoose.model("person", personSchema);
// ***********************************************************


// ***********************************************************
// RESTful Routes (students)
// ***********************************************************

// Redirect ROOT to INDEX
app.get("/", (req, res) => {
    res.redirect("/students");
});

// INDEX
app.get("/students", (req, res) => {
    Person.find({}, (err, people) => {
        if (err) {
            console.log(err);
        } else {
            res.render("students_index", { people: people });
        }
    });
});

// NEW
app.get("/students/new", (req, res) => {
    res.render("students_new");
});

// CREATE
app.post("/students", (req, res) => {
    Person.create(req.body.person, (err, newPerson) => {
        if (err)
            console.log(err);
        else
            res.redirect("/students");
    });
});

// SHOW
app.get("/students/:id", (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err);
        } else {
            res.render("students_show", { person: person });
        }
    });
});

// EDIT
app.get("/students/:id/edit", (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err);
        } else {
            res.render("students_edit", { person: person });
        }
    });
});

// UPDATE
app.put("/students/:id", (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body.person, (err, updated) => {
        if (err)
            console.log(err);
        else
            res.redirect(`/students/${req.params.id}`);
    });
});

// DELETE
app.delete("/students/:id", (req, res) => {
    Person.findByIdAndDelete(req.params.id, (err) => {
        if (err)
            console.log(err);
        else
            res.redirect("/students");
    });
});
// ***********************************************************


// ***********************************************************
// RESTful Routes (assignments)
// ***********************************************************

// INDEX
app.get("/assignments", (req, res) => {
    res.render("assignments_index");
});

// NEW
app.get("/assignments/new", (req, res) => {
    res.render("assignments_new");
});

// CREATE
app.post("/assignments", (req, res) => {
    res.redirect("assignments");
});

// SHOW
app.get("/assignments/:id", (req, res) => {
    res.render("assignments_show");
});

// EDIT
app.get("/assignments/:id/edit", (req, res) => {
    res.render("assignments_edit");
});

// UPDATE
app.put("/assignments/:id", (req, res) => {
    res.redirect(`/assignments/${req.params.id}`);
});

// DELETE
app.delete("/assignments/:id", (req, res) => {
    res.redirect("assignments_index");
});
// ***********************************************************

let run_app = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on localhost:${run_app.address().port}`);
});