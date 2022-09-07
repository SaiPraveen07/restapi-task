const asyncHandler = require("express-async-handler");

console.log("calling task contrl");
const Tasks = require("../models/tasks.model");

// @desc   Get task
// @route  GET/api/task
// @access private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Tasks.find();

  res.status(200).json({
    success: true,
    result: tasks,
    message: "Fetched all the records",
  });
});

// @desc   Set Tasks
// @route  POST/api/tasks
// @access private
const setTasks = asyncHandler(async (req, res) => {
  console.log("Calling task- settask");
  const {
    taskName,
    taskID,
    description,
    startDate,
    endDate,
    updatedOn,
    creationDate,
  } = req.body;
  if (
    !taskName &&
    !taskID &&
    !description &&
    !startDate &&
    !endDate &&
    !updatedOn &&
    !creationDate
  ) {
    res.status(400);
    throw new Error("please add valid data");
  }

  console.log("req.user::", req.user);
  const mytask = await Tasks.create({
    projectId: req.user.id,
    taskName: taskName,
    taskID: taskID,
    description: description,
    startDate: startDate,
    endDate: endDate,
    assigneeName: req.user.id,
    updatedOn: updatedOn,
    creationDate: creationDate,
    createdBy: req.user.id,
    updatedBy: req.user.id,
  });

  res
    .status(200)
    .json({ success: true, result: mytask, message: "Successfully added" });
});

// @desc   Update tasks
// @route  PUT/api/tasks/:id
// @access private
const updateTasks = asyncHandler(async (req, res) => {
  const tasks = await Tasks.findById(req.params.id);

  if (!tasks) {
    res.status(400);
    throw new Error("task not found");
  }

  const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

// @desc   Delete Tasks
// @route  DELETE/api/tasks/:id
// @access private
const deleteTasks = asyncHandler(async (req, res) => {
  const tasks = await Tasks.findById(req.params.id);

  if (!tasks) {
    res.status(400);
    throw new Error("task not found");
  }
  await tasks.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  setTasks,
  updateTasks,
  deleteTasks,
};
