const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, default: 100 },
    released: { type: Date, default: Date.now() },
    due: { type: Date, default: Date.now() + 7 },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }
});

module.exports = mongoose.model("Assignment", assignmentSchema);