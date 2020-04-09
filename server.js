const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Person = require("./models/person");
const Assignment = require("./models/assignment");
const seedDB = require("./fakerseeds");

const studentRoutes = require("./routes/students");
const courseRoutes = require("./routes/courses");
const assignmentRoutes = require("./routes/assignments");
const indexRoutes = require("./routes/index");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");


// ***********************************************************
// Mongoose Configuration
// ***********************************************************
mongoose.connect('mongodb://localhost:27017/learnvas',
    { useNewUrlParser: true, useUnifiedTopology: true });

seedDB();
// ***********************************************************


// ***********************************************************
// Express Configuration
// ***********************************************************
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(expressSession({
    secret:"DasKopeDIIVBeachFossilsBeachHouse",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Person.authenticate()));
passport.serializeUser(Person.serializeUser());
passport.deserializeUser(Person.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
app.use(indexRoutes);
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/assignments", assignmentRoutes);
// ***********************************************************


let run_app = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on localhost:${run_app.address().port}`);
});