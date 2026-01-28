const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'All fields required; new password must be at least 6 characters' });
  }

  try {
    const [users] = await pool.execute(
      'SELECT password FROM users WHERE id = ? AND role = "admin"',  // Ensure only admin
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, users[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.execute(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
      [hashed, userId]
    );

    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error('CHANGE PASSWORD ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = changePassword;
