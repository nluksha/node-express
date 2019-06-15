const express = require('express');
const router = express.Router();
const entries = require('../controllers/entries');

router.get('/', entries.list);

module.exports = router;
