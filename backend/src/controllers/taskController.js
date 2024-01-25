import { Task } from "../schema/model.js";

export let createTask = async (req, res) => {
  let taskData = req.body;
  try {
    let result = await Task.create(taskData);
    if (req.body.assignees && req.body.assignees.length > 0) {
      result.assignees = req.body.assignees;
      await result.save();
    }
    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let readAllTask = async (req, res, next) => {
  try {
    let result = await Task.find({});
    res.status(200).json({
      success: true,
      message: "Task read successful",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let readTaskById = async (req, res, next) => {
  let id = req.id;
  try {
    let result = await Task.findById(id);
    res.status(200).json({
      success: true,
      message: "Task read successful",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let updateTask = async (req, res, next) => {
  let id = req.id;
  let data = req.body;
  delete data.email;
  delete data.password;
  try {
    let result = await Task.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Task update successful",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let deleteTask = async (req, res, next) => {
  let id = req.id;
  try {
    let result = await Task.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Task delete successful",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
