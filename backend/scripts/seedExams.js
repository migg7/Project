const mongoose = require('mongoose');
const Exam = require('../models/exam');
const User = require('../models/user');
// Add other models if needed

const seedData = async (subject, chapterName, questionsJsonPath) => {
    try {
        const questions = require(questionsJsonPath);

        // Validate subject
        const validSubjects = ['Aviation Meteorology', 'Air Navigation', 'Air Regulation', 'Technical General', 'Technical Specific'];
        if (!validSubjects.includes(subject)) {
            throw new Error(`Invalid subject: ${subject}`);
        }

        const newExam = new Exam({
            subject,
            chapterName,
            questions: questions.map(q => ({
                questionText: q.question || q.text,
                options: q.options,
                correctAnswerIndex: q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : q.options.indexOf(q.answer),
                explanation: q.explanation || ''
            }))
        });

        await newExam.save();
        console.log(`Successfully seeded ${chapterName} for ${subject}`);
    } catch (err) {
        console.error(`Error seeding data: ${err.message}`);
    }
};

const seedBulkData = async (jsonFilePath) => {
    try {
        const data = require(jsonFilePath);

        for (const entry of data) {
            const { subject, chapterName, questions } = entry;

            // Validate subject
            const validSubjects = ['Aviation Meteorology', 'Air Navigation', 'Air Regulation', 'Technical General', 'Technical Specific'];
            if (!validSubjects.includes(subject)) {
                console.warn(`Skipping entry: Invalid subject ${subject}`);
                continue;
            }

            const newExam = new Exam({
                subject,
                chapterName,
                questions: questions.map(q => ({
                    questionText: q.questionText,
                    options: q.options,
                    correctAnswerIndex: q.correctAnswerIndex,
                    explanation: q.explanation || ''
                }))
            });

            await newExam.save();
            console.log(`Successfully seeded ${chapterName} for ${subject}`);
        }
    } catch (err) {
        console.error(`Error seeding bulk data: ${err.message}`);
    }
};

// Example Usage:
// seedData('Aviation Meteorology', 'Atmosphere', './data/met_ch1.json');

// Check if running directly
if (require.main === module) {
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '../.env') });

    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aerospire')
        .then(() => {
            console.log('Connected to MongoDB');
            seedBulkData(path.join(__dirname, '../data/exam_seed.json'))
                .then(() => {
                    console.log('Seeding complete');
                    mongoose.disconnect();
                });
        })
        .catch(err => console.error('Connection error:', err));
}
