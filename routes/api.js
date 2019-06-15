const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const entries = require('../controllers/entries');

router.get('/user/:id', users.getUser);
router.post('/entry', entries.submit);

module.exports = router;