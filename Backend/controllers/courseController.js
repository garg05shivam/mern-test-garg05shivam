const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;
    const newCourse = new Course({
      courseName,
      courseDescription,
      instructor,
      createdBy: req.user.id,
    });
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findOneAndDelete({ _id: id, createdBy: req.user.id });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

