import React, { useState } from "react";
import axios from "axios";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/login`,
        {
          email,
          password
        }
      );

      // 🔥 Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      window.location.href = "/dashboard";

    } catch (err) {

      alert("Login failed ❌");

    }

  };

  return (

    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-deep)",
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 2000
    }}>
      <div className="glass-card animate-fade-in" style={{ padding: "60px", borderRadius: "32px", width: "450px", textAlign: "center", position: "relative", zIndex: 10 }}>
        <h2 style={{ color: "var(--text-main)", fontSize: "2.5rem", marginBottom: "30px", fontWeight: "900" }}>Admin Access</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            placeholder="Operational Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "18px 25px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255, 255, 255, 0.8)", color: "var(--text-main)", outline: "none" }}
          />

          <input
            type="password"
            placeholder="Access Key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "18px 25px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255, 255, 255, 0.8)", color: "var(--text-main)", outline: "none" }}
          />

          <button onClick={login} className="btn-pill" style={{ background: "var(--vibrant-blue)", color: "white", padding: "18px", fontWeight: "800", marginTop: "10px", boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}>
            INITIALIZE SESSION
          </button>
        </div>
      </div>
    </div>

  );

}

export default AdminLogin;