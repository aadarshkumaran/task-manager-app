const Task = require("../models/Task");
const mongoose = require("mongoose");

exports.createTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, owner: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const filters = { owner: req.user.id };
        if (req.query.completed) filters.completed = req.query.completed === "true";
        if (req.query.category) filters.category = req.query.category;
        if (req.query.search) filters.title = new RegExp(req.query.search, "i");

        const tasks = await Task.find(filters);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReminders = async (req, res) => {
    try {
        const now = new Date();
        const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const tasksDueSoon = await Task.find({
            owner: req.user.id,
            completed: false,
            // dueDate: { $gte: now, $lte: nextDay },
            dueDate: { $lte: nextDay }
        });

        res.json(tasksDueSoon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const owner = req.user.id;

        const total = await Task.countDocuments({ owner });
        const completed = await Task.countDocuments({ owner, completed: true });
        const pending = await Task.countDocuments({ owner, completed: false });

        const categoryStats = await Task.aggregate([
            { $match: { owner: new mongoose.Types.ObjectId(owner) } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.json({
            totalTasks: total,
            completedTasks: completed,
            pendingTasks: pending,
            tasksByCategory: categoryStats
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

