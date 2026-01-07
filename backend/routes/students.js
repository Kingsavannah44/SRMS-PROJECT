const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/students/search
// @desc    Search students
// @access  Private
router.get("/search", auth, async (req, res) => {
  const { q } = req.query;
  try {
    const students = await Student.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { course: { $regex: q, $options: "i" } },
      ],
    });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/students
// @desc    Add a student
// @access  Private
router.post("/", auth, async (req, res) => {
  const { name, email, age, course } = req.body;
  try {
    const newStudent = new Student({
      name,
      email,
      age,
      course,
    });
    const student = await newStudent.save();
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, age, course } = req.body;
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, age, course },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    await Student.findByIdAndRemove(req.params.id);
    res.json({ message: "Student removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
