'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');

dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'hbs');
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Routes
app.get('/admin_ticket', (req, res) => {
    res.render(path.join(__dirname, 'views', 'admin_ticket.hbs'));
});

// Database Configuration
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
});

// Connect to MySQL server


//creating database if not exist
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`;
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server');
    try {
        db.query(createDatabaseQuery, (err, results) => {
            if (err) {
                throw err; // Throw error if query execution fails
            }
            console.log(`Database "${process.env.DATABASE}" created or already exists`);
        });
    } catch (error) {
        console.error('Error creating database:', error);
    }
});

// Use dotenv config variables
if (process.env.DATABASE) {
    db.changeUser({ database: process.env.DATABASE }, (err) => {
        if (err) {
            console.error('Error selecting database:', err);
            return;
        }
        console.log(`Using database "${process.env.DATABASE}"`);
    });
} else {
    console.error('Database not specified in .env file');
    process.exit(1);
}

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/tasks'));
app.use('/user', require('./routes/ticket'));

// Start the server
const PORT = process.env.PORT || 3535;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
