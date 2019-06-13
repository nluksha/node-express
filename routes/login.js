const express = require('express');
const router = express.Router();
const User = require('../models/user');
const validate = require('../middleware/validate');

const form = (req, res) => {
  res.render('login', { title: 'Login' });
};

const submit = (req, res, next) => {
  const data = req.body.user;

  User.authenticate(data.name, data.pass, (err, user) => {
    if(err) {
      return next(err);
    }

    if (user) {
      req.session.uid = user.id;
      res.redirect('/');
    } else {
      res.error('Sorry! Invalid credentials.');
      res.redirect('back');
    }
  });
};

router.get('/', form);
router.post(
  '/',
  validate.required('user[name]'),
  validate.required('user[pass]'),
  submit
);

module.exports = router;
