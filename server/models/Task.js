const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    /* This field helps in showing notification to the user when a task is near or past its due date */
    dueDate: { type: Date}, 
    completed: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
