const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, default: "TBA" },
    subjects: { type: Array, required: true },
    start: { type: String, required },
    end: { type: String, required }
});

module.exports = mongoose.model("Course", courseSchema);