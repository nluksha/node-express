const express = require('express');
const router = express.Router();
const User = require('../models/user');
const validate = require('../middleware/validate');

const form = (req, res) => {
  res.render('register', { title: 'Register' });
};

const submit = (req, res) => {
  const data = req.body.entry;
  const user = res.locals.user;

  const userName = user? user.name: null;

  const entry = new Entry({
    userName: userName,
    title: data.title,
    body: data.body
  });

  entry.save(err => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};

router.get('/', form);
router.post('/', submit);

module.exports = router;
