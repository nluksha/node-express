const express = require('express');
const router = express.Router();
const User = require('../models/user');
const validate = require('../middleware/validate');

const form = (req, res) => {
  res.render('register', { title: 'Register' });
};

const submit = (req, res, next) => {
  const data = req.body.user;
  const user = res.locals.user;

  User.getByName(data.name, (err, user) => {
    if(err) {
      return next(err);
    }

    if (user.id) {
      res.error('Username already taken!');
      res.redirect('back');
    } else {
      const newUser = new User({
        name: data.name,
        pass: data.pass
      });

      newUser.save(err => {
        if(err) {
          return next(err);
        }

        req.session.uid = newUser.id;
        res.redirect('/');
      });
    }
  });
};

router.get('/', form);
router.post(
  '/',
  validate.required('user[name]'),
  validate.required('user[pass]'),
  validate.lengthAbove('user[name]', 4),
  validate.lengthAbove('user[pass]', 4),
  submit
);

module.exports = router;
