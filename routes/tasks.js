const express = require('express');
const router = express.Router();
const { createWork, fetchWork } = require('../controllers/work');

// Create a new work item
router.post('/createWork', createWork);

// Fetch work items
router.get('/fetchWork', fetchWork);



module.exports = router;
