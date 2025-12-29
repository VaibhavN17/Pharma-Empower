const express = require('express');
const router = express.Router();
const {getAllSessions,createSession,deleteSession } = require('../controllers/sessionController');
const {authenticateToken }=require("../middleware/auth");


router.post('/',authenticateToken,createSession);
router.get("/",authenticateToken,getAllSessions);
router.delete("/:id",authenticateToken,deleteSession);
module.exports = router;