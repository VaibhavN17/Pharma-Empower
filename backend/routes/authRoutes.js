const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/authController');
const changePassword = require('../controllers/changePasswordController');
const { authenticateToken, allowRoles } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', register);

// ✅ Admin change password (from dashboard)
router.put(
  '/admin/change-password',
  authenticateToken,
  allowRoles('admin'),
  changePassword
);

module.exports = router;
