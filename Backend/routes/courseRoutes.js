const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, courseController.createCourse);
router.get("/", authMiddleware, courseController.getCourses);
router.delete("/:id", authMiddleware, courseController.deleteCourse);

module.exports = router;