'use strict';
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});


// Function to handle user registration
exports.register = (req, res) => {
    const { name, email, password, passwordconfirm,ROLE } = req.body;

    // Validation: Check if all fields are provided
    if (!name || !email || !password || !passwordconfirm ||!ROLE) {
        return res.status(400).render('register', { message: 'Please fill in all fields.' });
    }

    // Validation: Check if passwords match
    if (password !== passwordconfirm) {
        return res.status(400).render('register', { message: 'Passwords do not match.' });
    }

    // Hash the password
    bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password: ' + err);
            return res.status(500).render('register', { message: 'Error creating user. Please try again later.' });
        }

        // Store user in database
        db.query('INSERT INTO user SET ?', { name: name, email: email, password: hashedPassword,ROLE:ROLE }, (err, result) => {
            if (err) {
                console.error('Error inserting user into database: ' + err);
                return res.status(500).render('register', { message: 'Error creating user. Please try again later.' });
            }
            console.log('User registered with id: ' + result.insertId);
            return res.status(201).render('register', { message: 'User registered successfully.' });
        });
    });
};

// Function to handle user login
exports.login = (req, res) => {
    const { email, password, ROLE } = req.body;

    // Validation: Check if email, password, and ROLE are provided
    if (!email || !password || !ROLE) {
        return res.status(400).render('login', { message: 'Please provide email, password, and ROLE.' });
    }

    // Query database to find user by email
    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
        try {
            if (error) {
                console.error('Error querying database:', error);
                return res.status(500).render('login', { message: 'Internal server error. Please try again.' });
            }

            // Check if user exists and password is correct
            if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
                return res.status(401).render('login', { message: 'Incorrect email or password.' });
            }

            // User authenticated successfully, check ROLE
            const user = {
                id: results[0].user_id,
                username: results[0].username,
                email: results[0].email,
                ROLE: results[0].ROLE // Assuming 'ROLE' is stored in the database
            };

            // Check if user's ROLE matches the intended role
            if (ROLE !== user.ROLE) {
                return res.status(403).render('login', { message: 'Wrong role chosen. Please select the correct role.' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, ROLE: user.ROLE }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            // Set JWT token in cookie
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

            // Redirect user to appropriate page based on their ROLE
            if (user.ROLE === 'administrator') {
                res.redirect('/admin');
            } else if (user.ROLE === 'user') {
                res.redirect('/user');
            } else {
                res.status(403).redirect('/login'); // Redirect to login for unrecognized ROLEs
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).render('login', { message: 'An error occurred. Please try again.' });
        }
    });
};


// Function to handle user logout
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login'); 
};

exports.admin_ticket=(req,res)=>{
    res.redirect('admin_ticket');
}
