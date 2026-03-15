const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        enum: ['Wrong Answer', 'Typo/Grammar', 'Ambiguous Options', 'Wrong Explanation', 'Image Issue', 'Other'],
        required: true
    },
    comment: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved', 'Dismissed'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);
