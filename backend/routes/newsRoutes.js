const express = require('express');
const router = express.Router();
const { getPharmaNews } = require('../controllers/pharmaNewsController');

router.get('/',getPharmaNews);

module.exports = router;