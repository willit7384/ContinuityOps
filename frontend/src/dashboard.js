import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const response = await fetch("http://localhost:5000/incidents");
        const data = await response.json();
        setIncidents(data);
      } catch (err) {
        console.error("Failed to fetch incidents:", err);
      }
    }
    fetchIncidents();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {incidents.length === 0 ? (
        <p>No active incidents.</p>
      ) : (
        <ul>
          {incidents.map((inc) => (
            <li key={inc.id}>
              {inc.title} - Status: {inc.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
