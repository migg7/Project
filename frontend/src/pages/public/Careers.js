import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Careers = () => {
    const [careers, setCareers] = useState([]);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/public/careers`);
                setCareers(res.data);
            } catch (err) {
                console.error("Error fetching careers", err);
            }
        };
        fetchCareers();
    }, []);

    const getRoleImage = (role) => {
        switch (role) {
            case 'Pilot': return 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            case 'Cabincrew': return 'https://images.unsplash.com/photo-1580210793618-f2f2ac37b01b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            case 'ATC': return 'https://images.unsplash.com/photo-1586071060907-7ae333420ce0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            default: return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        }
    };

    return (
        <div className="page-container" style={{ paddingTop: "140px" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
                <h1 className="section-title">Flight Deck Careers</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto", fontWeight: "500" }}>
                    Strategic roadmaps for modern aviation professional pathways.
                </p>
            </div>

            {careers.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px" }} className="card">
                    <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", fontWeight: "500" }}>No active career pathways identified.</p>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                    gap: "40px"
                }}>
                    {careers.map(c => (
                        <div key={c._id} className="card animate-fade-in" style={{ padding: "0", overflow: "hidden" }}>
                            <img
                                src={c.imageUrl || getRoleImage(c.role)}
                                alt={c.role}
                                style={{ width: "100%", height: "280px", objectFit: "cover", borderBottom: "1px solid var(--bg-soft)" }}
                            />

                            <div style={{ padding: "40px", flex: 1, display: "flex", flexDirection: "column" }}>
                                <h3 style={{ fontSize: "2rem", marginBottom: "16px", color: "var(--text-main)", fontWeight: "800" }}>{c.role}</h3>

                                <p style={{ color: "var(--text-muted)", marginBottom: "35px", lineHeight: "1.7", fontSize: "1.1rem", fontWeight: "500" }}>
                                    {c.details}
                                </p>

                                <a href={c.link || "#"} target="_blank" rel="noreferrer" className="btn-pill" style={{
                                    width: "100%", marginTop: "auto", textDecoration: "none", background: "var(--vibrant-blue)", color: "white", textAlign: "center", fontWeight: "800", boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)"
                                }}>
                                    Launch Roadmap &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Careers;
