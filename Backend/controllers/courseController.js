const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
    try {
        const {courseName,courseDescription, instructor} = req.body;
        const newCourse = new Course({
            courseName,
            courseDescription,
            instructor
        });
        await newCourse.save();
        res.status(201).json({message: "Course created successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const {id} = req.params;
        await Course.findByIdAndDelete(id);
        res.status(200).json({message: "Course deleted successfully"});
    }
    catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

