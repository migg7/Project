import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Programs = () => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await axios.get(`/api/public/programs`);
                setPrograms(res.data);
            } catch (err) {
                console.error("Error fetching programs", err);
            }
        };
        fetchPrograms();
    }, []);

    return (
        <div className="page-container" style={{ paddingTop: "100px" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "10px" }}>Training Catalog</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Industry-standard CPL and DGCA ground training programs.</p>
            </div>

            {programs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px" }} className="glass-card">
                    <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>No programs currently available. Please check back later.</p>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                    gap: "40px"
                }}>
                    {programs.map(p => (
                        <div key={p._id} className="glass-card animate-fade-in" style={{ padding: "0", overflow: "hidden" }}>
                            {/* Banner Image */}
                            <div style={{ position: "relative" }}>
                                <img
                                    src={p.imageUrl || "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                    alt={p.name}
                                    style={{ width: "100%", height: "260px", objectFit: "cover" }}
                                />
                                <div style={{
                                    position: "absolute",
                                    top: "20px",
                                    left: "20px",
                                    background: "var(--vibrant-blue)",
                                    color: "white",
                                    padding: "6px 18px",
                                    borderRadius: "50px",
                                    fontSize: "0.7rem",
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                    letterSpacing: "1.5px",
                                    boxShadow: "0 10px 20px rgba(0, 85, 212, 0.3)"
                                }}>
                                    {p.type || "CPL Program"}
                                </div>
                            </div>

                            <div style={{ padding: "40px", flex: 1, display: "flex", flexDirection: "column" }}>
                                <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "var(--text-main)", fontWeight: "800" }}>{p.name}</h3>
                                <p style={{ color: "var(--text-muted)", marginBottom: "35px", fontSize: "1.05rem", lineHeight: "1.7", fontWeight: "500" }}>
                                    {p.description}
                                </p>

                                <button className="btn-pill" style={{
                                    width: "100%", marginTop: "auto", background: "var(--vibrant-blue)", color: "white", fontWeight: "800",
                                    boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)"
                                }}>
                                    Initialize Enrollment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Programs;
