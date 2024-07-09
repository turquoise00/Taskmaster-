const db = require('../db');
const express = require('express');
const router = express.Router();


// Create a new work item
exports.createWork = (req, res) => {
  const { title, description } = req.body;
  const created_at = new Date();
  //const updated_at = new Date();
  db.query('INSERT INTO work (title, description, created_at) VALUES (?, ?, ?)', [title, description, created_at], (err, result) => {
    if (err) {
      console.error('Error creating work item:', err);
      return res.status(500).send('Error creating work item. Please try again.');
    }
    console.log('Work item created with ID:', result.insertId);
    res.redirect('/admin');
    //res.status(200).send('Work item created successfully.');
  });
};







exports.fetchWork = (req, res) => {
  db.query('SELECT * FROM work', (err, results) => {
    if (err) {
      console.error('Error fetching work items:', err);
      return res.status(500).send('Error fetching work items. Please try again.');
    }
    console.log('Fetched work items:', results); // Log fetched results
    res.json(results); // Send JSON response to the frontend
  });
};



//module.exports = router; 