const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: String, required: true },
    released: { type: String, required: true },
    due: { type: String, required: true }
});

module.exports = mongoose.model("Assignment", assignmentSchema);