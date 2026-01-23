// This file sets up the Express application with routes and database connection

// Import dependencies
import express from 'express';
// MySQL promise-based client
import mysql from 'mysql2/promise';
// Load environment variables from .env file
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();
// Create Express app
const app = express();
app.use(express.json()); // JSON body parser middleware for REST API

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET all systems
app.get('/systems', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM systems');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all incidents
app.get('/incidents', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM incidents');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new incident
app.post('/incidents', async (req, res) => {
  const { system_id, description, severity } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO incidents (system_id, description, severity) VALUES (?, ?, ?)',
      [system_id, description, severity]
    );

// Auto-create a recovery task (example async workflow)
    await pool.query(
      'INSERT INTO recovery_tasks (incident_id, description, assigned_to) VALUES (?, ?, ?)',
      [result.insertId, 'Initial assessment of incident', 'IT Team']
    );
// Respond with the new incident ID
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
