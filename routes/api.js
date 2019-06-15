const express = require('express');
const router = express.Router();
const usersApi = require('../controllers/usersApi');
const entriesApi = require('../controllers/entriesApi');
const page = require('../middleware/page');

router.use('/', usersApi.authUser); 
router.get('/user/:id', usersApi.getUser);
router.post('/entry', entriesApi.submit);
router.get('/entries/:page?', page(entriesApi.getCount, 3), entriesApi.entries);

module.exports = router;