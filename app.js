const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',     // Replace with your MySQL host
    user: 'root',          // Replace with your MySQL username
    password: 'Yash6602@', // Replace with your MySQL password
    database: 'school_management'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the School Management API');
});

// Add School API
app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate input
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert school into the database
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error('Error inserting school:', err);
            return res.status(500).json({ message: 'Error adding school' });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
});

// List Schools API
app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate input
    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Query to fetch all schools
    const query = 'SELECT id, name, address, latitude, longitude, ' +
                  ' ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance ' +
                  'FROM schools ' +
                  'HAVING distance < 50 ' +
                  'ORDER BY distance';

    db.query(query, [latitude, longitude, latitude], (err, results) => {
        if (err) {
            console.error('Error fetching schools:', err);
            return res.status(500).json({ message: 'Error fetching schools' });
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
