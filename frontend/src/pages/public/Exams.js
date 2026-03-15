import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Exams = () => {
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [examMode, setExamMode] = useState(null); // 'practice' or 'mock'
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportingQuestion, setReportingQuestion] = useState(null);
    const [reportReason, setReportReason] = useState('Wrong Answer');
    const [reportComment, setReportComment] = useState('');

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/public/exams`);
                setExams(res.data);
            } catch (err) {
                console.error("Error fetching exams", err);
            }
        };
        fetchExams();
    }, []);

    const calculateScore = useCallback(() => {
        let currentScore = 0;
        selectedExam.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswerIndex) {
                currentScore += 1;
            }
        });
        setScore(currentScore);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [selectedExam, answers]);

    useEffect(() => {
        let timer;
        if (examMode === 'mock' && !submitted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        calculateScore();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [examMode, submitted, timeLeft, calculateScore]);

    const groupedExams = exams.reduce((acc, exam) => {
        if (!acc[exam.subject]) acc[exam.subject] = [];
        acc[exam.subject].push(exam);
        return acc;
    }, {});

    const handleStartExam = (exam, mode) => {
        setSelectedExam(exam);
        setExamMode(mode);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        if (mode === 'mock') {
            setTimeLeft(exam.questions.length * 60); // 1 minute per question for mock
        }
    };

    const handleOptionSelect = (questionIndex, optionIndex) => {
        if (submitted) return;
        setAnswers({ ...answers, [questionIndex]: optionIndex });
    };

    const resetExam = () => {
        setSelectedExam(null);
        setExamMode(null);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setTimeLeft(0);
        window.scrollTo({ top: 0 });
    };

    const openReportModal = (question, index) => {
        setReportingQuestion({ ...question, index });
        setIsReportModalOpen(true);
    };

    const submitReport = async () => {
        try {
            await axios.post("http://localhost:5000/api/public/report", {
                examId: selectedExam._id,
                questionId: reportingQuestion._id || reportingQuestion.index, // Fallback if no ID
                questionText: reportingQuestion.questionText,
                reason: reportReason,
                comment: reportComment
            });
            alert("Report submitted successfully");
            setIsReportModalOpen(false);
            setReportReason('Wrong Answer');
            setReportComment('');
        } catch (err) {
            console.error("Error submitting report", err);
            alert("Failed to submit report");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const [selectedSubject, setSelectedSubject] = useState(null);

    return (
        <div className="page-container animate-fade-in" style={{ paddingTop: "120px", minHeight: "100vh" }}>
            {!selectedExam ? (
                <>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        {/* 🧭 Breadcrumb / Back Navigation */}
                        {selectedSubject && (
                            <button
                                onClick={() => setSelectedSubject(null)}
                                className="btn-pill"
                                style={{
                                    marginBottom: "40px",
                                    padding: "10px 25px",
                                    background: "var(--surface-white)",
                                    color: "var(--vibrant-blue)",
                                    border: "1px solid var(--bg-soft)",
                                    fontSize: "0.9rem",
                                    fontWeight: "800",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    boxShadow: "var(--shadow-sm)"
                                }}
                            >
                                <span>&larr;</span> SUBJECT SELECTION
                            </button>
                        )}

                        <div style={{ textAlign: "center", marginBottom: "80px" }}>
                            <h1 style={{ fontSize: "4rem", marginBottom: "16px", fontWeight: "900", color: "var(--text-main)", textTransform: "uppercase", letterSpacing: "-0.03em" }}>
                                {selectedSubject ? selectedSubject : "Simulator Terminal"}
                            </h1>
                            <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto", fontWeight: "500" }}>
                                {selectedSubject
                                    ? `Select a technical vector for practice or initiate a high-fidelity evaluation.`
                                    : "Professional evaluation and diagnostic platform for advanced aviation systems."
                                }
                            </p>
                        </div>

                        {/* 📂 SUBJECT SELECTION VIEW */}
                        {!selectedSubject && (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                                gap: "40px"
                            }}>
                                {Object.keys(groupedExams).length === 0 ? (
                                    <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px" }} className="glass-card">
                                        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>Terminal currently offline. No modules active.</p>
                                    </div>
                                ) : (
                                    Object.keys(groupedExams).map((subject, idx) => (
                                        <div
                                            key={subject}
                                            onClick={() => setSelectedSubject(subject)}
                                            className="glass-card animate-fade-in"
                                            style={{
                                                padding: "60px 40px",
                                                cursor: "pointer",
                                                textAlign: "center",
                                                position: "relative",
                                                overflow: "hidden",
                                                animationDelay: `${idx * 0.1}s`
                                            }}
                                        >
                                            <div style={{
                                                fontSize: "50px",
                                                marginBottom: "30px",
                                                background: "rgba(96, 165, 250, 0.08)",
                                                width: "120px", height: "120px",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                borderRadius: "40px", margin: "0 auto 30px",
                                                color: "var(--vibrant-blue)",
                                                border: "1px solid rgba(96, 165, 250, 0.15)",
                                                boxShadow: "0 0 30px rgba(96, 165, 250, 0.1)"
                                            }}>
                                                {subject === 'Aviation Meteorology' ? '☁️' : subject === 'Air Navigation' ? '🧭' : subject === 'Air Regulation' ? '⚖️' : '✈️'}
                                            </div>
                                            <h3 style={{ fontSize: "2rem", color: "var(--text-main)", fontWeight: "800" }}>{subject}</h3>
                                            <p style={{ color: "var(--text-muted)", marginTop: "15px", fontSize: "1.1rem" }}>{groupedExams[subject].length} active modules</p>
                                            <div style={{ marginTop: "30px", fontSize: "0.85rem", fontWeight: "800", color: "var(--accent-cyan)", letterSpacing: "2px", textTransform: "uppercase" }}>
                                                Initialize Vector &rarr;
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* 📑 SUBJECT DETAIL VIEW (Chapters + Mock) */}
                        {selectedSubject && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "60px", alignItems: "start" }}>
                                {/* PRACTICE CHAPTERS */}
                                <div>
                                    <h3 style={{ fontSize: "1.5rem", color: "var(--text-main)", marginBottom: "30px", fontWeight: "800", display: "flex", alignItems: "center", gap: "15px" }}>
                                        <div style={{ width: "4px", height: "24px", background: "var(--vibrant-blue)", borderRadius: "10px", boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }}></div>
                                        CHAPTER-WISE PRACTICE
                                    </h3>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
                                        {groupedExams[selectedSubject].map((exam, idx) => (
                                            <div
                                                key={exam._id}
                                                className="glass-card animate-fade-in"
                                                style={{ padding: "35px", textAlign: "left", animationDelay: `${idx * 0.05}s` }}
                                            >
                                                <h4 style={{ fontSize: "1.3rem", color: "var(--text-main)", marginBottom: "25px", fontWeight: "700" }}>{exam.chapterName}</h4>
                                                <button
                                                    onClick={() => handleStartExam(exam, 'practice')}
                                                    className="btn-pill"
                                                    style={{
                                                        width: "100%", padding: "16px",
                                                        background: "rgba(96, 165, 250, 0.08)",
                                                        color: "var(--accent-cyan)",
                                                        fontWeight: "800", fontSize: "0.85rem",
                                                        border: "1px solid rgba(96, 165, 250, 0.15)",
                                                        letterSpacing: "1px"
                                                    }}
                                                >
                                                    START PRACTICE
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SEPARATE MOCK TEST SECTION */}
                                <div style={{ position: "sticky", top: "140px" }}>
                                    <div style={{
                                        background: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
                                        padding: "45px 40px",
                                        borderRadius: "32px",
                                        color: "var(--text-main)",
                                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
                                        border: "1px solid rgba(6, 182, 212, 0.15)",
                                        textAlign: "center"
                                    }}>
                                        <div style={{
                                            fontSize: "50px", marginBottom: "25px",
                                            filter: "drop-shadow(0 0 10px var(--accent-cyan))"
                                        }}>⚡</div>
                                        <h3 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "15px", color: "var(--accent-cyan)", letterSpacing: "1px" }}>SUBJECT MOCK</h3>
                                        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "35px", lineHeight: "1.6" }}>
                                            High-fidelity simulation aggregated for 100% DGCA compliance.
                                        </p>
                                        <button
                                            onClick={() => {
                                                const allSubjectQuestions = groupedExams[selectedSubject].reduce((all, ex) => [...all, ...ex.questions], []);
                                                handleStartExam({
                                                    _id: "subject-mock",
                                                    chapterName: `${selectedSubject} - EVALUATION`,
                                                    questions: allSubjectQuestions
                                                }, 'mock');
                                            }}
                                            className="btn-pill"
                                            style={{
                                                width: "100%", padding: "20px",
                                                background: "var(--vibrant-blue)",
                                                color: "white", fontSize: "1rem",
                                                fontWeight: "800",
                                                boxShadow: "0 10px 40px rgba(96, 165, 250, 0.3)"
                                            }}
                                        >
                                            ENTER EVALUATION
                                        </button>
                                    </div>

                                    {/* Stats Card */}
                                    <div style={{ marginTop: "25px", padding: "35px" }} className="glass-card">
                                        <h4 style={{ fontSize: "0.8rem", fontWeight: "900", color: "var(--accent-cyan)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "25px" }}>Telemetry Status</h4>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <span style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>Total Vectors:</span>
                                            <span style={{ fontWeight: "800", color: "var(--text-main)" }}>{groupedExams[selectedSubject].reduce((sum, ex) => sum + ex.questions.length, 0)}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>System Modules:</span>
                                            <span style={{ fontWeight: "800", color: "var(--text-main)" }}>{groupedExams[selectedSubject].length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <div className="glass-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "60px", padding: "25px 40px", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <button onClick={resetExam} className="btn-pill" style={{ padding: "12px 30px", background: "rgba(0,0,0,0.03)", color: "var(--text-main)", fontSize: "0.9rem", border: "1px solid rgba(0,0,0,0.08)" }}>
                            &larr; EXIT TERMINAL
                        </button>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ color: "var(--accent-cyan)", fontSize: "0.8rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "3px" }}>
                                {examMode === 'practice' ? 'Practice Vector' : 'High-Fidelity Evaluation'}
                            </span>
                            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "900", color: "var(--text-main)" }}>{selectedExam.chapterName}</h2>
                        </div>
                        <div style={{ width: "150px", textAlign: "right" }}>
                            {examMode === 'mock' && !submitted && (
                                <div style={{ fontSize: "1.4rem", fontWeight: "900", color: timeLeft < 60 ? "#ef4444" : "var(--accent-cyan)", letterSpacing: "1px" }}>
                                    ⏱️ {formatTime(timeLeft)}
                                </div>
                            )}
                        </div>
                    </div>

                    {submitted && (
                        <div className="animate-fade-in" style={{
                            background: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
                            color: "var(--text-main)",
                            padding: "100px 60px",
                            borderRadius: "40px",
                            textAlign: "center",
                            marginBottom: "80px",
                            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.08)",
                            border: "1px solid rgba(6, 182, 212, 0.15)",
                            position: "relative",
                            overflow: "hidden"
                        }}>
                            <h3 style={{ fontSize: "1.2rem", marginBottom: "25px", color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "4px", fontWeight: "900" }}>Diagnostic Report</h3>
                            <div style={{ fontSize: "8rem", fontWeight: "900", marginBottom: "20px", letterSpacing: "-0.05em", color: "var(--text-main)", filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.15))" }}>
                                {Math.round((score / selectedExam.questions.length) * 100)}<span style={{ fontSize: "4rem", opacity: 0.5 }}>%</span>
                            </div>
                            <p style={{ fontSize: "1.4rem", margin: "0 auto 45px", color: "var(--text-muted)", fontWeight: "500", maxWidth: "600px" }}>
                                Operational efficiency verified at <strong>{score}</strong>/<strong>{selectedExam.questions.length}</strong>.
                            </p>
                            <button onClick={resetExam} className="btn-pill" style={{ background: "var(--vibrant-blue)", color: "white", padding: "20px 60px", fontSize: "1.1rem", boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}>REINITIALIZE</button>
                        </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                        {selectedExam.questions.map((q, idx) => {
                            const isCorrect = answers[idx] === q.correctAnswerIndex;
                            const isAnswered = answers[idx] !== undefined;
                            const showResult = submitted || (examMode === 'practice' && isAnswered);

                            let cardStyle = {
                                padding: "50px",
                                background: "var(--glass-bg)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(0, 0, 0, 0.05)",
                                borderRadius: "32px",
                                position: "relative",
                                animationDelay: `${idx * 0.1}s`
                            };

                            if (showResult) {
                                cardStyle.borderColor = isCorrect ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)";
                                cardStyle.background = isCorrect ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)";
                            }

                            return (
                                <div key={idx} className="glass-card animate-fade-in" style={cardStyle}>
                                    <div style={{ position: "absolute", top: "35px", right: "35px" }}>
                                        <button
                                            onClick={() => openReportModal(q, idx)}
                                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem", opacity: 0.2, transition: "0.3s" }}
                                            onMouseOver={(e) => e.target.style.opacity = 1}
                                            onMouseOut={(e) => e.target.style.opacity = 0.2}
                                            title="Flag Telemetry Anomaly"
                                        >
                                            🚩
                                        </button>
                                    </div>
                                    <div style={{ display: "flex", gap: "30px", alignItems: "flex-start", marginBottom: "45px" }}>
                                        <div style={{
                                            background: showResult ? (isCorrect ? "#10b981" : "#ef4444") : "var(--vibrant-blue)",
                                            color: "white", width: "45px", height: "45px", borderRadius: "14px",
                                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                            fontWeight: "900", fontSize: "1.1rem", boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)"
                                        }}>
                                            {idx + 1}
                                        </div>
                                        <h4 style={{ fontSize: "1.5rem", margin: 0, color: "var(--text-main)", lineHeight: "1.5", fontWeight: "700" }}>
                                            {q.questionText}
                                        </h4>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                        {q.options.map((opt, optIdx) => {
                                            const isSelected = answers[idx] === optIdx;
                                            const isActualCorrectResponse = q.correctAnswerIndex === optIdx;

                                            let optStyle = {
                                                display: "flex", alignItems: "center", gap: "20px",
                                                cursor: showResult ? "default" : "pointer",
                                                padding: "22px 30px", borderRadius: "20px",
                                                border: "1px solid rgba(0, 0, 0, 0.05)",
                                                background: "rgba(0,0,0,0.01)",
                                                transition: "all 0.3s ease",
                                                fontSize: "1.1rem", fontWeight: "500", color: "var(--text-muted)"
                                            };

                                            if (!showResult && isSelected) {
                                                optStyle.borderColor = "var(--vibrant-blue)";
                                                optStyle.background = "rgba(59, 130, 246, 0.05)";
                                                optStyle.color = "var(--vibrant-blue)";
                                                optStyle.boxShadow = "0 5px 15px rgba(59, 130, 246, 0.1)";
                                            } else if (showResult) {
                                                if (isActualCorrectResponse) {
                                                    optStyle.borderColor = "#10b981";
                                                    optStyle.background = "rgba(16, 185, 129, 0.2)";
                                                    optStyle.color = "#d1fae5";
                                                } else if (isSelected && !isCorrect) {
                                                    optStyle.borderColor = "#ef4444";
                                                    optStyle.background = "rgba(239, 68, 68, 0.2)";
                                                    optStyle.color = "#fee2e2";
                                                }
                                            }

                                            return (
                                                <label key={optIdx} style={optStyle} className="shadow-hover">
                                                    <input
                                                        type="radio"
                                                        name={`question-${idx}`}
                                                        checked={isSelected}
                                                        onChange={() => handleOptionSelect(idx, optIdx)}
                                                        disabled={showResult}
                                                        style={{ width: "22px", height: "22px", accentColor: "var(--accent-cyan)" }}
                                                    />
                                                    <span style={{ flex: 1 }}>{opt}</span>
                                                    {showResult && isActualCorrectResponse && <span style={{ fontSize: "1.4rem" }}>⚡</span>}
                                                </label>
                                            );
                                        })}
                                    </div>

                                    {showResult && q.explanation && (
                                        <div style={{
                                            marginTop: "40px", padding: "30px",
                                            background: "rgba(6, 182, 212, 0.03)",
                                            borderRadius: "24px",
                                            borderLeft: "6px solid var(--accent-cyan)",
                                            borderTop: "1px solid rgba(6, 182, 212, 0.1)"
                                        }}>
                                            <h5 style={{ margin: "0 0 15px 0", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "3px", color: "var(--accent-cyan)", fontWeight: "900" }}>Technical Briefing</h5>
                                            <p style={{ margin: 0, fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: "1.7" }}>{q.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {!submitted && (
                        <div className="glass-card" style={{
                            marginTop: "100px", textAlign: "center", padding: "80px",
                            borderRadius: "40px", color: "white", border: "1px solid rgba(59, 130, 246, 0.2)"
                        }}>
                            <div style={{ marginBottom: "40px" }}>
                                <p style={{ color: "var(--text-muted)", marginBottom: "15px", fontWeight: "800", letterSpacing: "3px", fontSize: "0.9rem", textTransform: "uppercase" }}>
                                    Evaluation Progress
                                </p>
                                <div style={{ width: "400px", height: "8px", background: "rgba(0,0,0,0.05)", borderRadius: "10px", margin: "0 auto", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
                                    <div style={{
                                        width: `${(Object.keys(answers).length / selectedExam.questions.length) * 100}%`,
                                        height: "100%", background: "var(--accent-cyan)",
                                        boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)",
                                        transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                                    }}></div>
                                </div>
                                <p style={{ marginTop: "20px", fontSize: "1.3rem", fontWeight: "700", color: "var(--text-main)" }}>
                                    {Object.keys(answers).length} / {selectedExam.questions.length} EVALUATED
                                </p>
                            </div>
                            <button
                                onClick={calculateScore}
                                className="btn-pill"
                                style={{
                                    padding: "22px 70px", fontSize: "1.1rem",
                                    background: "var(--vibrant-blue)", color: "white",
                                    opacity: Object.keys(answers).length !== selectedExam.questions.length ? "0.3" : "1",
                                    cursor: Object.keys(answers).length !== selectedExam.questions.length ? "not-allowed" : "pointer",
                                    fontWeight: "800", letterSpacing: "1px",
                                    boxShadow: Object.keys(answers).length === selectedExam.questions.length ? "0 0 30px rgba(59, 130, 246, 0.4)" : "none"
                                }}
                                disabled={Object.keys(answers).length !== selectedExam.questions.length}
                            >
                                {examMode === 'mock' ? 'FINISH EVALUATION' : 'GENERATE RESULTS'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Report Modal */}
            {isReportModalOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    background: "rgba(255, 255, 255, 0.8)", display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 2000, backdropFilter: "blur(15px)"
                }}>
                    <div className="glass-card animate-fade-in" style={{
                        padding: "50px", maxWidth: "600px", width: "95%",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)"
                    }}>
                        <h3 style={{ margin: "0 0 30px 0", fontSize: "2rem", fontWeight: "900", color: "var(--text-main)" }}>Telemetry Report</h3>
                        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "35px" }}>
                            Found a data anomaly? Submit the report for technical review.
                        </p>

                        <div style={{ marginBottom: "25px" }}>
                            <label style={{ display: "block", marginBottom: "12px", fontSize: "0.9rem", fontWeight: "800", color: "var(--accent-cyan)", letterSpacing: "2px", textTransform: "uppercase" }}>Anomaly Category</label>
                            <select
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                style={{
                                    width: "100%", padding: "18px", borderRadius: "18px",
                                    border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255, 255, 255, 0.9)",
                                    color: "var(--text-main)", outline: "none", fontSize: "1rem"
                                }}
                            >
                                <option>Wrong Answer</option>
                                <option>Typo/Grammar</option>
                                <option>Ambiguous Options</option>
                                <option>Wrong Explanation</option>
                                <option>Image Issue</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: "40px" }}>
                            <label style={{ display: "block", marginBottom: "12px", fontSize: "0.9rem", fontWeight: "800", color: "var(--accent-cyan)", letterSpacing: "2px", textTransform: "uppercase" }}>Details (Optional)</label>
                            <textarea
                                value={reportComment}
                                onChange={(e) => setReportComment(e.target.value)}
                                placeholder="Describe the findings..."
                                style={{
                                    width: "100%", padding: "20px", borderRadius: "18px",
                                    border: "1px solid rgba(0,0,0,0.1)", minHeight: "150px",
                                    background: "rgba(255, 255, 255, 0.9)", color: "var(--text-main)",
                                    outline: "none", fontSize: "1rem"
                                }}
                            />
                        </div>

                        <div style={{ display: "flex", gap: "20px" }}>
                            <button
                                onClick={() => setIsReportModalOpen(false)}
                                style={{
                                    flex: 1, padding: "20px", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.1)",
                                    background: "rgba(255,255,255,0.05)", color: "white", fontWeight: "800", cursor: "pointer"
                                }}
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={submitReport}
                                style={{
                                    flex: 1, padding: "20px", borderRadius: "50px", border: "none",
                                    background: "var(--vibrant-blue)", color: "white", fontWeight: "800",
                                    cursor: "pointer", boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                                }}
                            >
                                TRANSMIT DATA
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exams;
