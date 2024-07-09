const express = require('express');
const router = express.Router();
const { getTicket,addTicket,getTicketAdmin } = require('../controllers/ticket');

router.get('/getTicket', getTicket);
router.post('/addTicket', addTicket);
router.get('/getTicketAdmin', getTicketAdmin);


module.exports = router;
