const pool = require('../config/db');

/* ===============================
   CREATE CONTACT MESSAGE
================================ */
exports.createContactMessage = async (req, res) => {
    try {
        const { name, email, subject, organization_need, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: 'All required fields must be filled'
            });
        }

        await pool.query(
            `INSERT INTO contact_messages
             (name, email, subject, organization_need, message, status)
             VALUES (?, ?, ?, ?, ?, 'New')`,
            [
                name,
                email,
                subject,
                organization_need || null,
                message
            ]
        );

        res.status(201).json({
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Create contact error:', error);
        res.status(500).json({
            message: 'Failed to send message'
        });
    }
};

/* ===============================
   GET ALL CONTACTS (ADMIN)
================================ */
exports.getAllContacts = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM contact_messages
             ORDER BY created_at DESC`
        );

        res.json(rows);

    } catch (error) {
        console.error('Fetch contacts error:', error);
        res.status(500).json({
            message: 'Failed to fetch contacts'
        });
    }
};

/* ===============================
   MARK AS READ
================================ */
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            `UPDATE contact_messages
             SET status = 'Read'
             WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.json({
            message: 'Marked as read'
        });

    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            message: 'Failed to update status'
        });
    }
};
