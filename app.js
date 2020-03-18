const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

// ***********************************************************
// Express Configuration
// ***********************************************************
const app = express();
app.use(express.urlencoded({extended:true}));
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
// RESTful Routes
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
            res.render("index", {people: people});
        }
    });
});

// SHOW
app.get("/students/:id", (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {person: person});
        }
    });
});

// NEW
app.get("/students/new", (req, res) => {
    res.send("NEW: send form to create a new student");
});

// CREATE
app.post("/students", (req, res) => {
    res.send("POST: add student from form to database.");
});

// EDIT
app.get("/students/:id/edit", (req, res) => {
    res.send("EDIT: get student edit form");
});

// UPDATE
app.put("/students/:id", (req, res) => {
    res.send("UPDATE: update the student DB with form data");
});

// DELETE
app.delete("/students/:id", (req, res) => {
    res.send(`DELETE: student with in db with _id:${req.params.id}`);
});
// ***********************************************************

let run_app = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on localhost:${run_app.address().port}`);
});