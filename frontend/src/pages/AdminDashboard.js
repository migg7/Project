import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {

  const token = localStorage.getItem("token");

  const headers = {
    headers: { Authorization: "Bearer " + token }
  };

  const [section, setSection] = useState("notifications");

  const [notifications, setNotifications] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [medicals, setMedicals] = useState([]);
  const [careers, setCareers] = useState([]);
  const [exams, setExams] = useState([]);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [notificationImage, setNotificationImage] = useState("");

  const [programName, setProgramName] = useState("");
  const [programType, setProgramType] = useState("");
  const [programDesc, setProgramDesc] = useState("");
  const [programImage, setProgramImage] = useState("");

  const [medicalTitle, setMedicalTitle] = useState("");
  const [medicalDesc, setMedicalDesc] = useState("");
  const [medicalImage, setMedicalImage] = useState("");

  const [role, setRole] = useState("");
  const [details, setDetails] = useState("");
  const [careerLink, setCareerLink] = useState("");
  const [careerImage, setCareerImage] = useState("");

  const [examSubject, setExamSubject] = useState("");
  const [examChapter, setExamChapter] = useState("");
  const [examImage, setExamImage] = useState("");
  const [examQuestions, setExamQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" }
  ]);

  const handleImageUpload = async (file, setUrl) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(`/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUrl(res.data.imageUrl);
      alert("Image uploaded successfully! ✅");
    } catch (err) {
      console.error(err);
      alert("Image upload failed ❌");
    }
  };


  // ================= FETCH =================

  const handleAuthError = (err) => {
    console.error(err);
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`/api/admin/notifications`, headers);
      setNotifications(res.data);
    } catch (err) { handleAuthError(err); }
  };

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(`/api/admin/programs`, headers);
      setPrograms(res.data);
    } catch (err) { handleAuthError(err); }
  };

  const fetchMedicals = async () => {
    try {
      const res = await axios.get(`/api/admin/medicals`, headers);
      setMedicals(res.data);
    } catch (err) { handleAuthError(err); }
  };

  const fetchCareers = async () => {
    try {
      const res = await axios.get(`/api/admin/howtobecome`, headers);
      setCareers(res.data);
    } catch (err) { handleAuthError(err); }
  };

  const fetchExams = async () => {
    try {
      const res = await axios.get(`/api/admin/exams`, headers);
      setExams(res.data);
    } catch (err) { handleAuthError(err); }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchNotifications();
    fetchPrograms();
    fetchMedicals();
    fetchCareers();
    fetchExams();
  }, []);


  // ================= ADD =================

  const addNotification = async () => {
    try {
      await axios.post(`/api/admin/notifications`, { title, link, imageUrl: notificationImage }, headers);
      setTitle("");
      setLink("");
      setNotificationImage("");
      fetchNotifications();
      alert("Notification added successfully");
    } catch (err) { alert("Failed to add notification"); handleAuthError(err); }
  };

  const addProgram = async () => {
    try {
      await axios.post(`/api/admin/programs`, { name: programName, type: programType, description: programDesc, imageUrl: programImage }, headers);
      fetchPrograms();
      alert("Program added successfully");
    } catch (err) { alert("Failed to add program"); handleAuthError(err); }
  };

  const addMedical = async () => {
    try {
      await axios.post(`/api/admin/medicals`, { title: medicalTitle, description: medicalDesc, imageUrl: medicalImage }, headers);
      fetchMedicals();
      alert("Medical added successfully");
    } catch (err) { alert("Failed to add medical"); handleAuthError(err); }
  };

  const addCareer = async () => {
    try {
      await axios.post(`/api/admin/howtobecome`, { role, details, link: careerLink, imageUrl: careerImage }, headers);
      fetchCareers();
      alert("Career added successfully");
    } catch (err) { alert("Failed to add career"); handleAuthError(err); }
  };

  const addExam = async () => {
    try {
      await axios.post(`/api/admin/exams`, {
        subject: examSubject,
        chapterName: examChapter,
        questions: examQuestions,
        imageUrl: examImage
      }, headers);
      setExamSubject("");
      setExamChapter("");
      setExamImage("");
      setExamQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" }]);
      fetchExams();
      alert("Exam added successfully");
    } catch (err) { alert("Failed to save exam"); handleAuthError(err); }
  };


  // ================= DELETE =================

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/admin/notifications/${id}`, headers);
      fetchNotifications();
    } catch (err) { alert("Failed to delete notification"); handleAuthError(err); }
  };

  const deleteProgram = async (id) => {
    try {
      await axios.delete(`/api/admin/programs/${id}`, headers);
      fetchPrograms();
    } catch (err) { alert("Failed to delete program"); handleAuthError(err); }
  };

  const deleteMedical = async (id) => {
    try {
      await axios.delete(`/api/admin/medicals/${id}`, headers);
      fetchMedicals();
    } catch (err) { alert("Failed to delete medical"); handleAuthError(err); }
  };

  const deleteCareer = async (id) => {
    try {
      await axios.delete(`/api/admin/howtobecome/${id}`, headers);
      fetchCareers();
    } catch (err) { alert("Failed to delete career"); handleAuthError(err); }
  };

  const deleteExam = async (id) => {
    try {
      await axios.delete(`/api/admin/exams/${id}`, headers);
      fetchExams();
    } catch (err) { alert("Failed to delete exam"); handleAuthError(err); }
  };

  // ================= REPORTS =================
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`/api/admin/reports`, headers);
      setReports(res.data);
    } catch (err) { handleAuthError(err); }
  };

  const updateReportStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/reports/${id}`, { status }, headers);
      fetchReports();
      alert("Report updated");
    } catch (err) { alert("Failed to update report"); handleAuthError(err); }
  };

  const deleteReport = async (id) => {
    try {
      await axios.delete(`/api/admin/reports/${id}`, headers);
      fetchReports();
      alert("Report deleted");
    } catch (err) { alert("Failed to delete report"); handleAuthError(err); }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchNotifications();
    fetchPrograms();
    fetchMedicals();
    fetchCareers();
    fetchExams();
    fetchReports();
  }, []);

  return (
    <div className="page-container" style={{ padding: "100px 40px" }}>
      {/* ✈️ Admin Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "40px" }}>
        <div>
          <h1 style={{ color: "var(--text-main)", fontSize: "3.5rem", letterSpacing: "-0.04em", lineHeight: "1", fontWeight: "900" }}>Command Center</h1>
          <p style={{ color: "var(--accent-cyan)", fontWeight: "800", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "3px", marginTop: "10px" }}>
            AEROSPIRE Fleet Operations Control
          </p>
        </div>
        <button
          onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}
          className="btn-pill"
          style={{ background: "#ef4444", color: "white", padding: "12px 30px", fontWeight: "800", opacity: 0.8 }}
        >
          Deactivate Session
        </button>
      </div>

      {/* 🧭 Admin Navigation */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "60px",
        background: "rgba(0, 0, 0, 0.03)",
        padding: "8px",
        borderRadius: "24px",
        width: "fit-content",
        border: "1px solid rgba(0, 0, 0, 0.05)"
      }}>
        {["notifications", "programs", "medicals", "careers", "exams", "reports"].map(tab => (
          <button
            key={tab}
            onClick={() => setSection(tab)}
            className="btn-pill"
            style={{
              padding: "14px 30px",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              fontWeight: "800",
              letterSpacing: "2px",
              background: section === tab ? "var(--vibrant-blue)" : "transparent",
              color: "white",
              border: "none",
              boxShadow: section === tab ? "0 10px 30px rgba(96, 165, 250, 0.3)" : "none",
              opacity: section === tab ? 1 : 0.6
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass-card animate-fade-in" style={{ padding: "60px", borderRadius: "32px", border: "1px solid rgba(0, 0, 0, 0.08)" }}>
        {/* ... (keep other sections as is) ... */}

        {/* NOTIFICATIONS */}
        {section === "notifications" && (
          <div>
            <h2 style={{ marginBottom: "40px", fontSize: "2rem", color: "var(--text-main)", fontWeight: "900" }}>Announcement Control</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px" }}>
              <div style={formGroupStyle}>
                <div>
                  <label style={labelStyle}>ANNOUNCEMENT TITLE</label>
                  <input placeholder="Enter title..." value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>TARGET TRANSMISSION LINK</label>
                  <input placeholder="PDF link or URL" value={link} onChange={e => setLink(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ padding: "30px", border: "1px dashed rgba(0,0,0,0.1)", borderRadius: "24px", background: "rgba(0,0,0,0.02)" }}>
                  <label style={labelStyle}>VISUAL ASSET (BANNER)</label>
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0], setNotificationImage)} style={{ fontSize: "0.85rem", marginTop: "10px", color: "var(--text-muted)" }} />
                </div>
                <button onClick={addNotification} className="btn-pill" style={{ padding: "18px", background: "var(--vibrant-blue)", color: "white", fontWeight: "800" }}>Publish to NOTAM</button>
              </div>
              <div style={{ maxHeight: "600px", overflowY: "auto", padding: "20px", background: "rgba(241, 245, 249, 0.6)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "0.8rem", marginBottom: "20px", color: "var(--accent-cyan)", letterSpacing: "2px", fontWeight: "800" }}>ACTIVE FREQUENCIES</h3>
                {notifications.map(n => (
                  <div key={n._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "rgba(0,0,0,0.03)", marginBottom: "15px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: "700", color: "var(--text-main)" }}>{n.title}</div>
                    <button onClick={() => deleteNotification(n._id)} style={{ color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontWeight: "800", fontSize: "0.8rem" }}>ABORT</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROGRAMS */}
        {section === "programs" && (
          <div>
            <h2 style={{ marginBottom: "40px", fontSize: "2rem", color: "var(--text-main)", fontWeight: "900" }}>Training Catalog Control</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px" }}>
              <div style={formGroupStyle}>
                <input placeholder="Program Designation" value={programName} onChange={e => setProgramName(e.target.value)} style={inputStyle} />
                <input placeholder="Program Category (e.g. CPL Ground)" value={programType} onChange={e => setProgramType(e.target.value)} style={inputStyle} />
                <textarea placeholder="Technical specifications..." value={programDesc} onChange={e => setProgramDesc(e.target.value)} style={{ ...inputStyle, minHeight: "200px" }} />
                <div style={{ padding: "20px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "20px", background: "rgba(255,255,255,0.02)" }}>
                  <input type="file" onChange={e => handleImageUpload(e.target.files[0], setProgramImage)} style={{ color: "var(--text-muted)" }} />
                </div>
                <button onClick={addProgram} className="btn-pill" style={{ padding: "18px", background: "var(--vibrant-blue)", color: "white", fontWeight: "800", boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)" }}>Deploy Program</button>
              </div>
              <div style={{ maxHeight: "700px", overflowY: "auto", background: "rgba(0, 0, 0, 0.03)", borderRadius: "24px", padding: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                {programs.map(p => (
                  <div key={p._id} style={{ padding: "20px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: "700", color: "var(--text-main)" }}>{p.name}</div>
                    <button onClick={() => deleteProgram(p._id)} style={{ color: "#ef4444", border: "none", background: "none", fontWeight: "800" }}>DELETE</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MEDICALS */}
        {section === "medicals" && (
          <div>
            <h2 style={{ marginBottom: "40px", fontSize: "2rem", color: "var(--text-main)", fontWeight: "900" }}>Medical Hub Management</h2>
            <div style={formGroupStyle}>
              <input placeholder="Hub Designation (Name)" value={medicalTitle} onChange={e => setMedicalTitle(e.target.value)} style={inputStyle} />
              <textarea placeholder="Procedural details..." value={medicalDesc} onChange={e => setMedicalDesc(e.target.value)} style={{ ...inputStyle, minHeight: "200px" }} />
              <input type="file" onChange={e => handleImageUpload(e.target.files[0], setMedicalImage)} style={{ color: "var(--text-muted)" }} />
              <button onClick={addMedical} className="btn-pill" style={{ padding: "18px", background: "var(--vibrant-blue)", color: "white", fontWeight: "800" }}>Activate Hub</button>
            </div>
          </div>
        )}

        {/* CAREERS */}
        {section === "careers" && (
          <div>
            <h2 style={{ marginBottom: "40px", fontSize: "2rem", color: "var(--text-main)", fontWeight: "900" }}>Pathways Configuration</h2>
            <div style={formGroupStyle}>
              <select value={role} onChange={e => setRole(e.target.value)} style={inputStyle}>
                <option value="" style={{ background: "white", color: "var(--text-main)" }}>SELECT CAREER SECTOR</option>
                <option value="Pilot" style={{ background: "white", color: "var(--text-main)" }}>FLIGHT DECK (PILOT)</option>
                <option value="AME" style={{ background: "white", color: "var(--text-main)" }}>ENGINEERING (AME)</option>
                <option value="Cabincrew" style={{ background: "white", color: "var(--text-main)" }}>CABIN CREW</option>
                <option value="ATC" style={{ background: "white", color: "var(--text-main)" }}>AIR TRAFFIC CONTROL</option>
                <option value="Groundcrew" style={{ background: "white", color: "var(--text-main)" }}>GROUND OPERATIONS</option>
              </select>
              <textarea placeholder="Roadmap technical details..." value={details} onChange={e => setDetails(e.target.value)} style={{ ...inputStyle, minHeight: "200px" }} />
              <input placeholder="External Roadmap Link (URL)" value={careerLink} onChange={e => setCareerLink(e.target.value)} style={inputStyle} />
              <input type="file" onChange={e => handleImageUpload(e.target.files[0], setCareerImage)} style={{ color: "var(--text-muted)" }} />
              <button onClick={addCareer} className="btn-pill" style={{ padding: "18px", background: "var(--vibrant-blue)", color: "white", fontWeight: "800", boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)" }}>Sync Pathway</button>
            </div>
          </div>
        )}

        {/* EXAMS */}
        {section === "exams" && (
          <div>
            <h2 style={{ marginBottom: "40px", fontSize: "2rem", color: "var(--text-main)", fontWeight: "900" }}>Simulator Module Config</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
              <div style={formGroupStyle}>
                <select value={examSubject} onChange={e => setExamSubject(e.target.value)} style={inputStyle}>
                  <option value="" style={{ background: "white", color: "var(--text-main)" }}>SELECT EVALUATION SUBJECT</option>
                  <option value="Aviation Meteorology" style={{ background: "white", color: "var(--text-main)" }}>AVIATION METEOROLOGY</option>
                  <option value="Air Navigation" style={{ background: "white", color: "var(--text-main)" }}>AIR NAVIGATION</option>
                  <option value="Air Regulation" style={{ background: "white", color: "var(--text-main)" }}>AIR REGULATION</option>
                  <option value="Technical General" style={{ background: "white", color: "var(--text-main)" }}>TECHNICAL GENERAL</option>
                  <option value="Technical Specific" style={{ background: "white", color: "var(--text-main)" }}>TECHNICAL SPECIFIC</option>
                </select>
                <input placeholder="Module/Chapter Name" value={examChapter} onChange={e => setExamChapter(e.target.value)} style={inputStyle} />
                <input type="file" onChange={e => handleImageUpload(e.target.files[0], setExamImage)} style={{ color: "var(--text-muted)" }} />

                <h3 style={{ marginTop: "40px", color: "var(--accent-cyan)", fontSize: "0.8rem", letterSpacing: "2px", fontWeight: "900" }}>DATASET EDITOR</h3>
                {examQuestions.map((q, idx) => (
                  <div key={idx} style={{ border: "1px solid rgba(255,255,255,0.05)", padding: "30px", borderRadius: "24px", marginBottom: "20px", background: "rgba(255,255,255,0.02)" }}>
                    <input placeholder={`Evaluation Item ${idx + 1}`} value={q.questionText} onChange={e => {
                      const qs = [...examQuestions];
                      qs[idx].questionText = e.target.value;
                      setExamQuestions(qs);
                    }} style={{ ...inputStyle, marginBottom: "20px", background: "rgba(15, 23, 42, 0.4)" }} />
                    <div style={{ display: "grid", gap: "10px" }}>
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                          <input type="radio" checked={q.correctAnswerIndex === optIdx} onChange={() => {
                            const qs = [...examQuestions];
                            qs[idx].correctAnswerIndex = optIdx;
                            setExamQuestions(qs);
                          }} style={{ width: "20px", height: "20px", accentColor: "var(--vibrant-blue)" }} />
                          <input placeholder={`Vector Option ${optIdx + 1}`} value={opt} onChange={e => {
                            const qs = [...examQuestions];
                            qs[idx].options[optIdx] = e.target.value;
                            setExamQuestions(qs);
                          }} style={{ flex: 1, padding: "12px 20px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255, 255, 255, 0.8)", color: "var(--text-main)" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={() => setExamQuestions([...examQuestions, { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" }])} className="btn-pill" style={{ background: "rgba(0,0,0,0.03)", color: "var(--text-main)", padding: "15px", fontWeight: "800", border: "1px solid rgba(0,0,0,0.05)" }}>+ Add evaluation item</button>
                <button onClick={addExam} className="btn-pill" style={{ marginTop: "30px", padding: "20px", background: "var(--vibrant-blue)", color: "white", fontWeight: "800" }}>Commit Module to Cloud</button>
              </div>
              <div style={{ maxHeight: "800px", overflowY: "auto", background: "rgba(15, 23, 42, 0.4)", padding: "30px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 style={{ opacity: 0.5, marginBottom: "30px", fontSize: "0.7rem", fontWeight: "900", letterSpacing: "2px", color: "var(--accent-cyan)" }}>OPERATIONAL MODULES</h3>
                {exams.map(e => (
                  <div key={e._id} style={{ padding: "20px", background: "rgba(0,0,0,0.03)", marginBottom: "15px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(0,0,0,0.05)" }}>
                    <div>
                      <div style={{ fontWeight: "800", color: "var(--text-main)", fontSize: "1.1rem" }}>{e.chapterName}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: "700" }}>{e.subject}</div>
                    </div>
                    <button onClick={() => deleteExam(e._id)} style={{ color: "#ef4444", border: "none", background: "none", fontWeight: "900", fontSize: "0.8rem" }}>OFFLINE</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REPORTS */}
        {section === "reports" && (
          <div>
            <h2 style={{ marginBottom: "40px", fontSize: "2rem", color: "var(--text-main)", fontWeight: "900" }}>Question Report Desk</h2>
            <div style={{ maxHeight: "700px", overflowY: "auto", background: "rgba(15, 23, 42, 0.4)", padding: "30px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
              {reports.length === 0 ? (
                <p style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>No reports currently logged. System operational.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {reports.map(r => (
                    <div key={r._id} style={{ background: "rgba(0,0,0,0.03)", padding: "30px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                        <div>
                          <span style={{
                            background: r.status === 'Pending' ? "#FEF3C7" : (r.status === 'Resolved' ? "#D1FAE5" : "#374151"),
                            color: r.status === 'Pending' ? "#92400E" : (r.status === 'Resolved' ? "#065F46" : "#F3F4F6"),
                            padding: "4px 12px", borderRadius: "50px", fontSize: "0.7rem", fontWeight: "800", letterSpacing: "1px"
                          }}>
                            {r.status.toUpperCase()}
                          </span>
                          <h4 style={{ margin: "10px 0 5px 0", color: "var(--text-main)" }}>{r.examId?.chapterName} ({r.examId?.subject})</h4>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>Reported on {new Date(r.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {r.status === 'Pending' && (
                            <>
                              <button onClick={() => updateReportStatus(r._id, 'Resolved')} className="btn-pill" style={{ background: "#D1FAE5", color: "#065F46", padding: "8px 15px", fontSize: "0.75rem", fontWeight: "800" }}>RESOLVE</button>
                              <button onClick={() => updateReportStatus(r._id, 'Dismissed')} className="btn-pill" style={{ background: "rgba(255,255,255,0.05)", color: "white", padding: "8px 15px", fontSize: "0.75rem", fontWeight: "800" }}>DISMISS</button>
                            </>
                          )}
                          <button onClick={() => deleteReport(r._id)} style={{ color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: "800" }}>DELETE</button>
                        </div>
                      </div>
                      <div style={{ padding: "20px", background: "rgba(15, 23, 42, 0.4)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <p style={{ margin: "0 0 10px 0", fontWeight: "700", color: "var(--accent-cyan)" }}>Question:</p>
                        <p style={{ margin: "0 0 20px 0", opacity: 0.8, color: "var(--text-main)" }}>{r.questionText}</p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                          <div>
                            <p style={{ margin: "0 0 5px 0", fontWeight: "700", color: "var(--vibrant-blue)", fontSize: "0.75rem" }}>REASON</p>
                            <p style={{ margin: 0, color: "var(--text-muted)" }}>{r.reason}</p>
                          </div>
                          <div>
                            <p style={{ margin: "0 0 5px 0", fontWeight: "700", color: "var(--vibrant-blue)", fontSize: "0.75rem" }}>COMMENT</p>
                            <p style={{ margin: 0, color: "var(--text-muted)" }}>{r.comment || "No further details."}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const formGroupStyle = { display: "flex", flexDirection: "column", gap: "25px" };
const inputStyle = { padding: "18px 25px", borderRadius: "18px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", background: "rgba(255, 255, 255, 0.8)", fontSize: "1rem", fontWeight: "500", color: "var(--text-main)", transition: "var(--transition)" };
const labelStyle = { fontSize: "0.7rem", fontWeight: "900", color: "var(--accent-cyan)", letterSpacing: "2px", marginLeft: "10px", marginBottom: "8px", display: "block" };

export default AdminDashboard;