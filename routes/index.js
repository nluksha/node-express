var express = require('express');
var router = express.Router();

const usersRouter = require('./users');
const postRouter = require('./post');
const entriesRouter = require('./entries');
const registerRouter = require('./register');

router.use('/', entriesRouter);
router.use('/users', usersRouter);
router.use('/post', postRouter);
router.use('/register', registerRouter);

module.exports = router;
