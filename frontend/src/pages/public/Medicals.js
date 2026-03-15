import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Medicals = () => {
    const [medicals, setMedicals] = useState([]);

    useEffect(() => {
        const fetchMedicals = async () => {
            try {
                const res = await axios.get(`/api/public/medicals`);
                setMedicals(res.data);
            } catch (err) {
                console.error("Error fetching medicals", err);
            }
        };
        fetchMedicals();
    }, []);

    return (
        <div className="page-container" style={{ paddingTop: "140px" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
                <h1 className="section-title">Medical Clearance</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto", fontWeight: "500" }}>
                    DGCA Class 1 & 2 medical examination resources and guidance.
                </p>
            </div>

            {medicals.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px" }} className="card">
                    <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", fontWeight: "500" }}>No medical clearance data found in this sector.</p>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                    gap: "40px"
                }}>
                    {medicals.map(m => (
                        <div key={m._id} className="card animate-fade-in" style={{ padding: "0", overflow: "hidden" }}>
                            <img
                                src={m.imageUrl || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                alt=""
                                style={{ width: "100%", height: "240px", objectFit: "cover", borderBottom: "1px solid var(--bg-soft)" }}
                            />

                            <div style={{ padding: "40px", flex: 1, display: "flex", flexDirection: "column" }}>
                                <h3 style={{ fontSize: "1.8rem", marginBottom: "16px", color: "var(--text-main)", fontWeight: "800" }}>{m.title}</h3>
                                <p style={{ color: "var(--text-muted)", marginBottom: "35px", lineHeight: "1.7", fontSize: "1.1rem", fontWeight: "500" }}>
                                    {m.description}
                                </p>

                                <button className="btn-pill" style={{
                                    width: "100%", marginTop: "auto", background: "var(--vibrant-blue)", color: "white", fontWeight: "800", boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)"
                                }}>
                                    Initialize Clearance &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Medicals;
