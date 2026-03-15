import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';

const UserAuthModal = ({ onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`/api/auth/google`, {
        token: credentialResponse.credential
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful! ✅");
      onAuthSuccess();
      onClose();
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Google Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        const res = await axios.post(`/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful! ✅");
      } else {
        const res = await axios.post(`/api/auth/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        alert(res.data.msg);
        // After signup, switch to login mode with the email filled in
        setMode("login");
        setLoading(false);
        return;
      }
      onAuthSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(20px)",
        display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card animate-fade-in"
        style={{
          padding: "60px 50px", borderRadius: "var(--radius-xl)", width: "500px", position: "relative",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)", border: "1px solid rgba(0, 0, 0, 0.05)"
        }}
      >
        <button onClick={onClose} style={{
          position: "absolute", top: "25px", right: "25px", border: "none", background: "rgba(0,0,0,0.03)",
          width: "40px", height: "40px", borderRadius: "50%", fontSize: "20px", cursor: "pointer", color: "var(--text-main)",
          display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.05)"
        }}>×</button>

        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <h2 style={{ color: "var(--text-main)", fontSize: "2.5rem", marginBottom: "15px", letterSpacing: "-0.03em", fontWeight: "900" }}>
            {mode === "login" ? "Terminal Access" : "Join AEROSPIRE"}
          </h2>
          <p style={{ color: "var(--accent-cyan)", fontWeight: "800", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "3px" }}>
            Command Center Authorization
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center" }}>

          <div style={{ width: "100%" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Login Failed")}
              useOneTap
              width="400"
              theme="filled_blue"
              shape="pill"
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "15px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.1)" }}></div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.7rem", fontWeight: "800", letterSpacing: "2px" }}>OR DIRECT CREDENTIALS</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.1)" }}></div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
            {mode === "signup" && (
              <input name="name" placeholder="Operational Name" required onChange={handleChange} style={inputStyle} />
            )}
            <input name="email" type="email" placeholder="Communication Email" required onChange={handleChange} style={inputStyle} />
            <input name="password" type="password" placeholder="Access Encryption (Password)" required onChange={handleChange} style={inputStyle} />

            {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center", fontWeight: "600" }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn-pill" style={{
              width: "100%", padding: "20px", background: "var(--vibrant-blue)", color: "white", fontSize: "1.1rem", fontWeight: "800",
              boxShadow: "0 10px 30px rgba(96, 165, 250, 0.3)"
            }}>
              {loading ? "AUTHENTICATING..." : mode === "login" ? "INITIALIZE SESSION" : "REGISTER TO FLEET"}
            </button>
          </form>

          <div style={{ textAlign: "center", fontSize: "1rem" }}>
            {mode === "login" ? (
              <p style={{ color: "var(--text-muted)" }}>Unauthorized? <span onClick={() => setMode("signup")} style={linkStyle}>Register credentials</span></p>
            ) : (
              <p style={{ color: "var(--text-muted)" }}>Already registered? <span onClick={() => setMode("login")} style={linkStyle}>Secure Login</span></p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "20px 25px", borderRadius: "18px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", fontSize: "1rem", background: "rgba(255, 255, 255, 0.8)", width: "100%",
  transition: "var(--transition)", color: "var(--text-main)", fontWeight: "500"
};

const linkStyle = {
  color: "var(--accent-cyan)", cursor: "pointer", fontWeight: "800", textDecoration: "none", borderBottom: "2px solid var(--accent-cyan)"
};

export default UserAuthModal;
