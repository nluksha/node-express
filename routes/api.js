const bacicAuth = require('basic-auth');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

const auth = (req, res, next) => {
  const { name, pass } = bacicAuth(req);
  User.authenticate(name, pass, (err, user) => {
    if (user) {
      req.remoteUser = user;
    }

    next(err);
  });
};

const user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user.id) {
      return res.sendStatus(404);
    }

    res.json(user);
  });
};

router.get('/user/:id', user);

module.exports = router;