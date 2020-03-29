const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    studentId: { type: String, required: true },
    major: { type: String, required: true },
    bio: { type: String, required: true }
});

module.exports = mongoose.model("Person", personSchema);