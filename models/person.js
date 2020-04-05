const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const personSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    studentId: { type: String, required: true },
    major: { type: String, required: true },
    bio: { type: String, required: true },
    img: { type: String, required: true }
});

personSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Person", personSchema);