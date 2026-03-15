import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Public Pages
import Home from "./pages/public/Home";
import Notifications from "./pages/public/Notifications";
import Programs from "./pages/public/Programs";
import Medicals from "./pages/public/Medicals";
import Careers from "./pages/public/Careers";
import Exams from "./pages/public/Exams";

function App() {

  return (

    <Router>

      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        
        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/medicals" element={<Medicals />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/exams" element={<Exams />} />

      </Routes>

    </Router>

  );

}

export default App;