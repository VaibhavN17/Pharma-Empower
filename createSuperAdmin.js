const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const createSuperAdmin = async () => {
    try {
        const email = process.env.SUPERADMIN_EMAIL;
        const password = process.env.SUPERADMIN_PASSWORD;

        if (!email || !password) {
            console.log('⚠️ SUPERADMIN env variables not set');
            return;
        }

        // Check if admin already exists
        const [rows] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            console.log('ℹ️ Super Admin already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.execute(
            `INSERT INTO users (full_name, email, password, role)
             VALUES (?, ?, ?, ?)`,
            ['Super Admin', email, hashedPassword, 'admin']
        );

        console.log('✅ Super Admin created successfully');

    } catch (error) {
        console.error('❌ Error creating Super Admin:', error.message);
    }
};

module.exports = createSuperAdmin;
