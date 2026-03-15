const express = require("express");
const router = express.Router();

const Notification = require("../models/notification");
const Program = require("../models/program");
const Medical = require("../models/medical");
const HowToBecome = require("../models/howtobecome");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// =============================
// ADD NOTIFICATION
// =============================
router.post("/notifications", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, link, imageUrl } = req.body;

    const notification = new Notification({
      title,
      link,
      imageUrl,
      createdBy: req.user.id
    });

    await notification.save();
    res.json({ msg: "Notification added" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// =============================
// GET NOTIFICATIONS
// =============================
router.get("/notifications", authMiddleware, adminMiddleware, async (req, res) => {
  const data = await Notification.find().sort({ createdAt: -1 });
  res.json(data);
});


// =============================
// DELETE NOTIFICATION
// =============================
router.delete("/notifications/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});


// =============================
// ADD PROGRAM
// =============================
router.post("/programs", authMiddleware, adminMiddleware, async (req, res) => {
  const { name, type, description, imageUrl } = req.body;

  const program = new Program({
    name, type, description, imageUrl
  });

  await program.save();
  res.json({ msg: "Program added" });
});


// =============================
// GET PROGRAMS
// =============================
router.get("/programs", authMiddleware, adminMiddleware, async (req, res) => {
  const data = await Program.find().sort({ createdAt: -1 });
  res.json(data);
});


// =============================
// DELETE PROGRAM
// =============================
router.delete("/programs/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.json({ msg: "Program deleted" });
});


// =============================
// ADD MEDICAL
// =============================
router.post("/medicals", authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, imageUrl } = req.body;

  const medical = new Medical({
    title, description, imageUrl
  });

  await medical.save();
  res.json({ msg: "Medical added" });
});


// =============================
// GET MEDICALS
// =============================
router.get("/medicals", authMiddleware, adminMiddleware, async (req, res) => {
  const data = await Medical.find().sort({ createdAt: -1 });
  res.json(data);
});


// =============================
// DELETE MEDICAL
// =============================
router.delete("/medicals/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Medical.findByIdAndDelete(req.params.id);
  res.json({ msg: "Medical deleted" });
});


// =============================
// ADD CAREER
// =============================
router.post("/howtobecome", authMiddleware, adminMiddleware, async (req, res) => {
  const { role, details, link, imageUrl } = req.body;

  const career = new HowToBecome({
    role, details, link, imageUrl,
    createdBy: req.user.id
  });

  await career.save();
  res.json({ msg: "Career added" });
});


// =============================
// GET CAREERS
// =============================
router.get("/howtobecome", authMiddleware, adminMiddleware, async (req, res) => {
  const data = await HowToBecome.find().sort({ createdAt: -1 });
  res.json(data);
});


// =============================
// DELETE CAREER
// =============================
router.delete("/howtobecome/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await HowToBecome.findByIdAndDelete(req.params.id);
  res.json({ msg: "Career deleted" });
});


// =============================
// ADD EXAM
// =============================
const Exam = require("../models/exam");

router.post("/exams", authMiddleware, adminMiddleware, async (req, res) => {
  const { subject, chapterName, questions, imageUrl } = req.body;
  try {
    const exam = new Exam({
      subject,
      chapterName,
      questions,
      imageUrl,
      createdBy: req.user.id
    });
    await exam.save();
    res.json({ msg: "Exam created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error creating exam", error: err.message });
  }
});


// =============================
// GET EXAMS (ADMIN)
// =============================
router.get("/exams", authMiddleware, adminMiddleware, async (req, res) => {
  const exams = await Exam.find().sort({ createdAt: -1 });
  res.json(exams);
});


// =============================
// UPDATE EXAM
// =============================
router.put("/exams/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { subject, chapterName, questions, imageUrl } = req.body;
    await Exam.findByIdAndUpdate(req.params.id, { subject, chapterName, questions, imageUrl });
    res.json({ msg: "Exam updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error updating exam", error: err.message });
  }
});


// =============================
// DELETE EXAM
// =============================
router.delete("/exams/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.json({ msg: "Exam deleted" });
});

// =============
// REPORTS
// =============
const Report = require("../models/report");

router.get("/reports", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const reports = await Report.find().populate('examId', 'chapterName subject').sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ msg: "Server error fetching reports", error: err.message });
  }
});

router.put("/reports/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await Report.findByIdAndUpdate(req.params.id, { status });
    res.json({ msg: "Report updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error updating report", error: err.message });
  }
});

router.delete("/reports/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ msg: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error deleting report", error: err.message });
  }
});

module.exports = router;