const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const studentSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    studentId: { type: String, required: true },
    major: { type: String, required: true },
    bio: { type: String, default: "Oops! No bio provided." },
    img: { type: String }
});

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", studentSchema);