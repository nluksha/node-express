const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.submit = (req, res, next) => {
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
