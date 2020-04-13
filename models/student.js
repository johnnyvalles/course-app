const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const studentSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    major: { type: String, default: "Oops! No major provided." },
    bio: { type: String, default: "Oops! No bio provided." },
    img: { type: String, default: "https://img.icons8.com/plasticine/100/000000/broken-robot.png" },
    courses: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Courses"
    }]
});

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", studentSchema);