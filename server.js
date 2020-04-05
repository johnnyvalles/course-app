const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const Person = require("./models/person");
const Assignment = require("./models/assignment");
const seedDB = require("./fakerseeds");

const studentRoutes = require("./routes/students");
const assignmentRoutes = require("./routes/assignments");
const indexRoutes = require("./routes/index");


// ***********************************************************
// Express Configuration
// ***********************************************************
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use("/students", studentRoutes);
app.use("/assignments", assignmentRoutes);
app.use(indexRoutes);
// ***********************************************************


// ***********************************************************
// Mongoose Configuration
// ***********************************************************
mongoose.connect('mongodb://localhost:27017/gradebook_app',
    { useNewUrlParser: true, useUnifiedTopology: true });

seedDB();
// ***********************************************************

let run_app = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on localhost:${run_app.address().port}`);
});