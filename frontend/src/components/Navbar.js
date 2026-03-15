import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserAuthModal from "./UserAuthModal";

function Navbar() {
  const location = useLocation();
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header style={{
      padding: "20px 40px",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "center"
    }}>
      <nav className="glass-effect" style={{
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "72px",
        width: "100%",
        maxWidth: "1400px",
        borderRadius: "100px",
        boxShadow: "var(--shadow-lg)",
        transition: "var(--transition)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px",
            background: "var(--vibrant-blue)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)"
          }}>
            <img 
              src="/aerospire-logo.png" 
              alt="Aerospire Logo" 
              style={{ width: "32px", height: "32px", objectFit: "contain" }} 
            />
          </div>
          <Link to="/" style={{
            color: "var(--text-main)",
            textDecoration: "none",
            fontSize: "1.4rem",
            fontWeight: "800",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.02em",
            textTransform: "uppercase"
          }}>
            AEROSPIRE
          </Link>
        </div>

        <div style={{
          display: "flex",
          gap: "8px",
          height: "100%"
        }}>
          {[
            { path: "/", label: "Home" },
            { path: "/notifications", label: "NOTAMs" },
            { path: "/programs", label: "Training" },
            { path: "/medicals", label: "Medical" },
            { path: "/careers", label: "Careers" },
            { path: "/exams", label: "Simulator" },
            { path: "mailto:aerospire.info@gmail.com", label: "Contact", isExternal: true }
          ].map((item) => (
            item.isExternal ? (
              <a
                key={item.label}
                href={item.path}
                style={{
                  color: "var(--text-main)",
                  textDecoration: "none",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  transition: "var(--transition)",
                  opacity: "0.7"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "var(--vibrant-blue)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.color = "var(--text-main)";
                }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: isActive(item.path) ? "var(--vibrant-blue)" : "var(--text-main)",
                  textDecoration: "none",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  transition: "var(--transition)",
                  opacity: isActive(item.path) ? "1" : "0.7",
                  borderBottom: isActive(item.path) ? "2px solid var(--vibrant-blue)" : "2px solid transparent"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "var(--vibrant-blue)";
                }}
                onMouseOut={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.opacity = "0.7";
                    e.currentTarget.style.color = "var(--text-main)";
                  }
                }}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", opacity: 0.8, textTransform: "uppercase", color: "var(--text-main)" }}>{user.name}</span>
              <button onClick={handleLogout} className="btn-pill" style={{
                padding: "8px 18px", fontSize: "0.75rem", background: "var(--bg-soft)", color: "var(--text-main)", border: "1px solid var(--glass-border)", fontWeight: "800"
              }}>
                Exit Portal
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} className="btn-pill" style={{
              padding: "10px 24px", fontSize: "0.8rem", background: "var(--vibrant-blue)", color: "white",
              boxShadow: "var(--shadow-md)", fontWeight: "800"
            }}>
              Launch Terminal
            </button>
          )}

          <Link to="/admin" style={{ opacity: 0.4, transition: "var(--transition)", textDecoration: "none", fontSize: "1.2rem" }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.4}>
            ⚙️
          </Link>
        </div>

      </nav>
      {showAuth && <UserAuthModal onClose={() => setShowAuth(false)} onAuthSuccess={() => window.location.reload()} />}
    </header>
  );

}

export default Navbar;