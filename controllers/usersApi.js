const bacicAuth = require('basic-auth');
const User = require('../models/user');

exports.authUser = (req, res, next) => {
  const { name, pass } = bacicAuth(req);
  User.authenticate(name, pass, (err, user) => {
    if (user) {
      req.remoteUser = user;
    }

    next(err);
  });
};

exports.getUser = (req, res, next) => {
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
