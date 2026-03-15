const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ['Aviation Meteorology', 'Air Navigation', 'Air Regulation', 'Technical General', 'Technical Specific'],
    required: true
  },
  chapterName: {
    type: String,
    required: true
  },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true },
    explanation: { type: String }
  }],
  imageUrl: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
