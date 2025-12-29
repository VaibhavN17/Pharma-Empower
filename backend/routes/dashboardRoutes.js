const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');

// Admin dashboard stats
router.get('/stats', getDashboardStats);

module.exports = router;
