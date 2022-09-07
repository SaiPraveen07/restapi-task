const { numberParser } = require("config/parser");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    projectId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "please add project id"],
      },
    ],

    taskName: {
      type: String,
      required: [true, "please add a task name"],
    },
    taskID: {
      type: Number,
      required: [true, "please add a task_ID"],
    },

    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    startDate: {
      type: Date,
      required: [true, "please enter the start date"],
    },
    endDate: {
      type: Date,
      required: [true, "please enter a end date"],
    },
    assigneeName: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
      },
    ],
    reportingTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
      },
    ],

    creationDate: {
      type: Date,
      required: [true, "please enter date"],
    },

    updatedOn: {
      type: Date,
      required: [true, "please enter date"],
    },
    createdBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
      },
    ],

    updatedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", taskSchema);
