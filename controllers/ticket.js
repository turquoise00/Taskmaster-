const db = require('../db');


//function to fetch ticket
function getTicket(req, res) {
    const sql = `
        SELECT ticket_id, status,worktobedone FROM ticket
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user tickets:', err);
            return res.status(500).send('Error fetching user tickets. Please try again.');
        }

        console.log('Fetched work items:', result); // Log fetched results
        res.json(result); // Send JSON response to the frontend
    });
}
// Function to add a new ticket
function addTicket(req, res) {
    const { status,worktobedone } = req.body;
    const sql = `INSERT INTO ticket (status, worktobedone) VALUES ( ?,?)`;
    db.query(sql, [ status,worktobedone], (err, result) => {
        if (err) {
            console.error('Error adding new ticket:', err);
            return res.status(500).json({ message: 'Error adding new ticket. Please try again.' });
        }

        
        console.log('New ticket added successfully',result);
        res.json({ message: 'New ticket added successfully' });
    });
}



//fucntion to fetch ticket for admin
function getTicketAdmin(req, res) {
    const sql = `
        SELECT ticket_id, status,worktobedone,created_at FROM ticket
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user tickets:', err);
            return res.status(500).send('Error fetching user tickets. Please try again.');
        }

        console.log('Fetched work items:', result); // Log fetched results
        res.json(result); // Send JSON response to the frontend
    });
}



module.exports = {
    getTicket,
    addTicket,
    getTicketAdmin
};
