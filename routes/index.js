var express = require('express');
var router = express.Router();

const postRouter = require('./post');
const entriesRouter = require('./entries');
const registerRouter = require('./register');
const loginRouter = require('./login');
const logoutRouter = require('./logout');

router.use('/', entriesRouter);
router.use('/post', postRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

module.exports = router;
