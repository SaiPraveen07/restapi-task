const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { getTasks, setTasks } = require("../controllers/task.controller");
router.route("/").get(protect, getTasks);
router.route("/").post(protect, setTasks);
//router.route("/:id").delete(deleteTasks).put(updateTasks);

module.exports = router;
