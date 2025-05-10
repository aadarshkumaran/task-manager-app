const express = require("express");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getReminders,
    getDashboardStats
} = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);
router.post("/", createTask);
router.get("/", getTasks);
router.get("/reminders", getReminders);  // in-app notification reminder
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/dashboard", getDashboardStats); 

module.exports = router;
