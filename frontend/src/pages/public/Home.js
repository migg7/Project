import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      {/* ✈️ Hero Section: Professional Startup Style */}
      <section className="page-container" style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: "64px",
        alignItems: "center",
        paddingTop: "140px",
        paddingBottom: "120px"
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(37, 99, 235, 0.08)",
            color: "var(--vibrant-blue)",
            padding: "10px 24px",
            borderRadius: "50px",
            fontSize: "0.8rem",
            fontWeight: "800",
            marginBottom: "24px",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            border: "1px solid rgba(37, 99, 235, 0.15)"
          }}>
            Next-Gen Aviation Platform
          </div>
          <h1 style={{
            fontSize: "5.5rem",
            lineHeight: "0.95",
            marginBottom: "32px",
            fontWeight: "800",
            letterSpacing: "-0.04em",
            color: "var(--text-main)"
          }}>
            Pioneering Your <br />
            <span style={{ color: "var(--vibrant-blue)" }}>Aviation</span> Career
          </h1>
          <p style={{ 
            fontSize: "1.25rem", 
            color: "var(--text-muted)", 
            marginBottom: "48px", 
            maxWidth: "580px", 
            fontWeight: "500",
            lineHeight: "1.6"
          }}>
            The definitive ecosystem for DGCA ground classes and CPL training. We combine
            Airbus-level precision with Boeing-style technical results.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/exams" className="btn-pill" style={{ 
              background: "var(--vibrant-blue)", 
              color: "white", 
              boxShadow: "0 12px 24px rgba(37, 99, 235, 0.3)" 
            }}>
              Access Terminal
            </Link>
            <Link to="/programs" className="btn-pill" style={{ 
              background: "var(--surface-white)", 
              color: "var(--text-main)", 
              border: "1px solid var(--bg-soft)",
              boxShadow: "var(--shadow-md)"
            }}>
              View Programs
            </Link>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ 
            position: "relative", 
            zIndex: 1,
            padding: "12px",
            background: "var(--surface-white)",
            borderRadius: "40px",
            boxShadow: "var(--shadow-xl)"
          }}>
            <img
              src="/aviation_hero_pilot_in_style.png"
              alt="Aerospace Training"
              style={{
                width: "100%",
                height: "620px",
                objectFit: "cover",
                borderRadius: "32px",
                border: "1px solid var(--bg-soft)"
              }}
            />
            {/* Professional Overlay */}
            <div style={{
              position: "absolute",
              inset: "12px",
              background: "linear-gradient(225deg, rgba(37, 99, 235, 0.1) 0%, transparent 50%)",
              borderRadius: "32px",
              pointerEvents: "none"
            }}></div>
          </div>
        </div>
      </section>

      {/* 🚀 Ecosystem Grid: Clean & High Contrast */}
      <section style={{ 
        background: "var(--bg-soft)", 
        padding: "120px 0", 
        borderRadius: "80px 80px 0 0", 
        borderTop: "1px solid var(--glass-border)" 
      }}>
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 className="section-title">Integrated Ecosystem</h2>
            <p style={{ 
              color: "var(--text-muted)", 
              fontSize: "1.25rem", 
              maxWidth: "600px", 
              margin: "0 auto",
              fontWeight: "500" 
            }}>
              Highly specialized modules designed for the modern aviator. Precision, data, and performance.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "32px"
          }}>
            {[
              {
                title: "DGCA Ground Studies",
                desc: "Air Navigation, Meteo, and Regulations with real-world Airbus case studies.",
                icon: "📐",
                link: "/programs"
              },
              {
                title: "Mock Terminal",
                desc: "High-fidelity exam simulation. Full-chapter banks for DGCA Technical exams.",
                icon: "📡",
                link: "/exams"
              },
              {
                title: "Career Flight Path",
                desc: "Strategic guidance for Cadet Programs and international flight schooling.",
                icon: "🗺️",
                link: "/careers"
              }
            ].map((feature, i) => (
              <div key={i} className="card" style={{ 
                padding: "60px 40px", 
                textAlign: "left",
              }}>
                <div style={{
                  fontSize: "32px",
                  marginBottom: "32px",
                  background: "var(--glass-blue)",
                  width: "72px",
                  height: "72px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  color: "var(--vibrant-blue)",
                  border: "1px solid rgba(37, 99, 235, 0.1)"
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "1.75rem", marginBottom: "20px", color: "var(--text-main)", fontWeight: "800" }}>{feature.title}</h3>
                <p style={{ 
                  flex: 1, 
                  marginBottom: "40px", 
                  fontSize: "1.1rem", 
                  color: "var(--text-muted)", 
                  lineHeight: "1.6",
                  fontWeight: "500"
                }}>{feature.desc}</p>
                <Link to={feature.link} style={{
                  color: "var(--vibrant-blue)",
                  fontWeight: "800",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  letterSpacing: "1.5px"
                }}>
                  Initialize Module <span style={{ fontSize: "18px" }}>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
