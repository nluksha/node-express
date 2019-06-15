const User = require('../models/user');

module.exports = (req, res, next) => {
  if (req.remoteUser) {
    res.local.user = req.remoteUser;
  }

  const uid = req.session.uid;

  if(!uid) {
    return next();
  }

  User.get(uid, (err, user) => {
    if(err) {
      return next(err);
    }

    req.user = user;
    res.locals.user = user;
    
    next();
  });
};