'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).redirect('/login'); // Redirect to login if no token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).redirect('/login'); // Redirect to login if token is invalid
        }
        req.user = decoded;
        next();
    });
};

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/admin', verifyToken, (req, res) => {
    // Check the ROLE stored in req.user.ROLE
    if (req.user.ROLE === 'administrator') {
        res.render('admin'); // Render admin page
    } else {
        res.status(403).redirect('/login'); // Redirect to login for unauthorized ROLEs
    }
});

router.get('/user', verifyToken, (req, res) => {
    // Check the ROLE stored in req.user.ROLE
    if (req.user.ROLE === 'user') {
        res.render('user'); // Render user page
    } else {
        res.status(403).redirect('/login'); // Redirect to login for unauthorized ROLEs
    }
});

router.get('/logout', (req, res) => {
    // Clear JWT token from cookie
    res.clearCookie('jwt');
    // Redirect to login page
    res.redirect('/login');
});


module.exports = router;
