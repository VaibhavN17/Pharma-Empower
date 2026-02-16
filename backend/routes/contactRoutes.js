const express = require('express');
const router = express.Router();
const {
    createContactMessage,
    getAllContacts,
    markAsRead
} = require('../controllers/contactController');

// user submits contact
router.post('/', createContactMessage);

// admin fetch all
router.get('/', getAllContacts);

// admin marks as read
router.put('/:id/read', markAsRead);

module.exports = router;
