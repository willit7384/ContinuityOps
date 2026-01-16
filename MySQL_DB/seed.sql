-- Create database
CREATE DATABASE IF NOT EXISTS continuityops;
USE continuityops;

-- Systems table
CREATE TABLE IF NOT EXISTS systems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    owner_team VARCHAR(50),
    criticality ENUM('Low','Medium','High') NOT NULL,
    rto_minutes INT,
    rpo_minutes INT,
    dependencies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Incidents table
CREATE TABLE IF NOT EXISTS incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    system_id INT,
    description TEXT,
    severity ENUM('Low','Medium','High'),
    status ENUM('Detected','Mitigating','Restored','Closed') DEFAULT 'Detected',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (system_id) REFERENCES systems(id)
);

-- Recovery tasks table
CREATE TABLE IF NOT EXISTS recovery_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incident_id INT,
    description TEXT,
    assigned_to VARCHAR(50),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
);

-- Post-incident reports table
CREATE TABLE IF NOT EXISTS post_incident_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incident_id INT,
    summary TEXT,
    lessons_learned TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
);

-- Seed example systems
INSERT INTO systems (name, owner_team, criticality, rto_minutes, rpo_minutes, dependencies) VALUES
('Online Learning', 'IT', 'High', 120, 15, ''),
('Student Support', 'Admin', 'Medium', 240, 30, ''),
('Payroll/HR Software', 'Finance', 'High', 180, 30, ''),
('Campus Email', 'IT', 'High', 60, 10, ''),
('Library Database', 'Library', 'Medium', 360, 60, '');

-- Seed example incidents
INSERT INTO incidents (system_id, description, severity, status) VALUES
(1, 'Server outage for online courses', 'High', 'Detected'),
(2, 'Advisor portal login issues', 'Medium', 'Mitigating'),
(4, 'Email spam filter malfunction', 'Medium', 'Restored');

-- Seed example recovery tasks
INSERT INTO recovery_tasks (incident_id, description, assigned_to) VALUES
(1, 'Restart online learning servers', 'IT Team'),
(1, 'Notify students of downtime', 'Admin Team'),
(2, 'Reset portal authentication service', 'IT Team');
