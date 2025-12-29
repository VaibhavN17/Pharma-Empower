const pool = require("../config/db");
// CREATE SESSION (Book session)
exports.createSession = async (req, res) => {
    console.log("create session function is running here")
    console.log("Request body:", req.body); // check what frontend sends
    console.log("request userId",req.user.userId);
    try {
        const { fullName, phone, topic, date} = req.body;
        console.log(fullName, phone, topic, date); // log values

        const sql = `
            INSERT INTO sessions 
            (user_id,full_name, phone, topic, session_date) 
            VALUES (?,?, ?, ?, ?)
        `;
        await pool.execute(sql, [req.user.userId,fullName, phone, topic, date]);

        res.status(201).json({ message: "Session created" });
    } catch (error) {
        console.error("DB ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};




// GET ALL SESSIONS (Admin)
exports.getAllSessions = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        user_id,
        full_name,
        phone,
        topic,
        DATE_FORMAT(session_date, '%d %b %Y') AS session_date,
        DATE_FORMAT(created_at, '%d %b %Y %h:%i %p') AS created_at
      FROM sessions
      ORDER BY created_at DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }

};

exports.deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM sessions WHERE id = ?", [id]);
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete session" });
  }
};


