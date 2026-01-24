const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// ✅ Start cron jobs
require("./services/pharmaNewsCron");

// Routes
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const newsRoutes = require("./routes/newsRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const communityAdminRoutes = require('./routes/communityAdminRoutes');

// DB
const pool = require('./config/db');

const app = express();

/* ================= ROOT HEALTH ================= */
app.get("/", (req, res) => {
    res.status(200).send("Pharma Empower Backend is running 🚀");
});

/* ================= CORS (DEPLOY + LOCAL FIX) ================= */
const allowedOrigins = [
    'http://localhost:3000',
    'https://static-site-8s17.onrender.com'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Postman
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔥 REQUIRED for preflight
app.options('*', cors());

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ================= DB TEST ================= */
pool.getConnection()
    .then(conn => {
        console.log('✅ Database connected successfully');
        conn.release();
    })
    .catch(err => console.error('❌ DB error:', err));

/* ================= ROUTES ================= */
app.use('/api/calendar', calendarRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/admin/community', communityAdminRoutes);
app.use('/api/pages', require('./routes/pageRoutes'));

/* ================= HEALTH ================= */
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
