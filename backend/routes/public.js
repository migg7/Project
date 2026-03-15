const express = require("express");
const router = express.Router();

const Notification = require("../models/notification");
const Program = require("../models/program");
const Medical = require("../models/medical");
const Career = require("../models/howtobecome");

// Notifications
router.get("/notifications", async (req, res) => {
  const data = await Notification.find().sort({ createdAt: -1 });
  res.json(data);
});

// Programs
router.get("/programs", async (req, res) => {
  const data = await Program.find().sort({ createdAt: -1 });
  res.json(data);
});

// Medicals
router.get("/medicals", async (req, res) => {
  const data = await Medical.find().sort({ createdAt: -1 });
  res.json(data);
});

// Careers
router.get("/careers", async (req, res) => {
  const data = await Career.find().sort({ createdAt: -1 });
  res.json(data);
});

// Exams
const Exam = require("../models/exam");
router.get("/exams", async (req, res) => {
  const data = await Exam.find().sort({ subject: 1, chapterName: 1 });
  res.json(data);
});

// Reporting
const Report = require("../models/report");
router.post("/report", async (req, res) => {
  try {
    const { examId, questionId, questionText, reason, comment, userId } = req.body;
    const report = new Report({
      examId,
      questionId,
      questionText,
      reason,
      comment,
      userId
    });
    await report.save();
    res.json({ msg: "Report submitted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error submitting report", error: err.message });
  }
});

module.exports = router;