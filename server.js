const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Student = require("./models/student");

const studentRoutes = require("./routes/students");
const courseRoutes = require("./routes/courses");
const indexRoutes = require("./routes/index");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");


// ***********************************************************
// Mongoose Configuration
// ***********************************************************
mongoose.connect('mongodb+srv://johnny:a7K7aXcqggGtLPXV@cluster0-y1nk1.mongodb.net/learnvas?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
});

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
passport.use(new LocalStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.userEnrolled = false;
    next();
});
app.use(indexRoutes);
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
// ***********************************************************


let run_app = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on localhost:${run_app.address().port}`);
});