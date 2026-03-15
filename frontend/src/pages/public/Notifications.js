import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/public/notifications`);
                setNotifications(res.data);
            } catch (err) {
                console.error("Error fetching notifications", err);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="page-container" style={{ paddingTop: "140px" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
                <h1 className="section-title">NOTAM Terminal</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto", fontWeight: "500" }}>
                    Notice to Air Missions: Real-time aviation updates and announcements.
                </p>
            </div>

            {notifications.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px" }} className="card">
                    <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", fontWeight: "500" }}>No active NOTAMs at this coordinate.</p>
                </div>
            ) : (
                <div style={{ display: "grid", gap: "32px", maxWidth: "1000px", margin: "0 auto" }}>
                    {notifications.map(n => (
                        <div key={n._id} className="card animate-fade-in" style={{
                            padding: "40px",
                            display: "grid",
                            gridTemplateColumns: n.imageUrl ? "180px 1fr" : "1fr",
                            alignItems: "center",
                            gap: "40px"
                        }}>

                            {n.imageUrl && (
                                <img
                                    src={n.imageUrl}
                                    alt=""
                                    style={{ width: "180px", height: "180px", borderRadius: "24px", objectFit: "cover", border: "1px solid var(--bg-soft)" }}
                                />
                            )}

                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: "0.8rem",
                                    fontWeight: "800",
                                    color: "var(--vibrant-blue)",
                                    textTransform: "uppercase",
                                    letterSpacing: "2.5px",
                                    marginBottom: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}>
                                    <span style={{ width: "8px", height: "8px", background: "var(--vibrant-blue)", borderRadius: "50%", boxShadow: "0 0 10px rgba(37, 99, 235, 0.4)" }}></span>
                                    {new Date(n.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                                <h3 style={{ margin: "0 0 20px 0", fontSize: "1.75rem", color: "var(--text-main)", letterSpacing: "-0.02em", fontWeight: "800" }}>{n.title}</h3>
                                
                                {n.content && (
                                    <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "1.1rem", lineHeight: "1.6", fontWeight: "500" }}>
                                        {n.content}
                                    </p>
                                )}

                                {n.link && (
                                    <a href={n.link} target="_blank" rel="noreferrer" className="btn-pill" style={{
                                        padding: "14px 32px", fontSize: "0.85rem", background: "var(--vibrant-blue)", color: "white", display: "inline-flex", textDecoration: "none", fontWeight: "800", boxShadow: "var(--shadow-md)"
                                    }}>
                                        Open Transmission &rarr;
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
