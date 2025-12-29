const pool = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        // TOTAL ENQUIRIES
        const [[{ totalEnquiries }]] = await pool.query(
            `SELECT COUNT(*) AS totalEnquiries FROM contact_messages`
        );

        // TODAY'S ENQUIRIES
        const [[{ todayEnquiries }]] = await pool.query(
            `SELECT COUNT(*) AS todayEnquiries 
             FROM contact_messages 
             WHERE DATE(created_at) = CURDATE()`
        );

        // ACTIVE STUDENTS (users with role = user)
        const [[{ activeStudents }]] = await pool.query(
            `SELECT COUNT(*) AS activeStudents 
             FROM users 
             WHERE role = 'user'`
        );

        // FORUM DISCUSSIONS
        const [[{ forumDiscussions }]] = await pool.query(
            `SELECT COUNT(*) AS forumDiscussions 
             FROM forum_posts`
        );

        res.json({
            totalEnquiries,
            todayEnquiries,
            activeStudents,
            forumDiscussions
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to load dashboard stats' });
    }
};
