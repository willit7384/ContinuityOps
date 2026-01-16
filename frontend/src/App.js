import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import IncidentForm from "./components/IncidentForm";
import SystemInventory from "./components/SystemInventory";
import ReviewGenerator from "./components/ReviewGenerator";

export default function App() {
  const [view, setView] = useState("dashboard");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>ContinuityOps</h1>
      <nav>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("incidentForm")}>New Incident</button>
        <button onClick={() => setView("systemInventory")}>System Inventory</button>
        <button onClick={() => setView("reviewGenerator")}>Post-Incident Review</button>
      </nav>
      <hr />
      <div>
        {view === "dashboard" && <Dashboard />}
        {view === "incidentForm" && <IncidentForm />}
        {view === "systemInventory" && <SystemInventory />}
        {view === "reviewGenerator" && <ReviewGenerator />}
      </div>
    </div>
  );
}
