const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

/* ================= USER ================= */
router.post('/requests', calendarController.createRequest);
router.get('/user/:id', calendarController.getUserRequests);
router.get('/approved', calendarController.getApprovedBookings);

/* ================= ADMIN ================= */
router.get('/admin/requests', calendarController.getAllRequests);
router.put('/admin/update-status', calendarController.updateStatus);

module.exports = router;
