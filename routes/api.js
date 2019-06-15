const express = require('express');
const router = express.Router();
const usersApi = require('../controllers/usersApi');
const entriesApi = require('../controllers/entriesApi');
const page = require('../middleware/page');

router.get('/user/:id', usersApi.getUser);
router.post('/entry', entriesApi.submit);
router.post('/entries/:page?', page(entriesApi.getCount, 3), entriesApi.entries);

module.exports = router;