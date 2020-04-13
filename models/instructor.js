const mongoose = require("mongoose");
const passportLocalMongoose = requrie("passport-local-mongoose");

const instructorSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    bio: { type: String, default: "Oops! No bio provided." },
    img: { type: String, default: "https://img.icons8.com/plasticine/100/000000/broken-robot.png" }
});

instructorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Instructor", instructorSchema);