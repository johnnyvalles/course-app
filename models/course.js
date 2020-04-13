const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, default: "TBA" },
    subject: { type: String, required: true },
    icon: { type: String, defualt: "bug" },
    description: { type: String, required: true },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }] 
});

module.exports = mongoose.model("Course", courseSchema);