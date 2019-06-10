const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const validate = require('../middleware/validate');

const form = (req, res) => {
  res.render('post', { title: 'Post' });
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
router.post('/', 
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]', 4),
  submit
);

module.exports = router;
