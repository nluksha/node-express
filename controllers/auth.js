const User = require('../models/user');

exports.getLoginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.submitLogin = (req, res, next) => {
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

exports.getRegisterForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.submitRegister = (req, res, next) => {
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

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if(err) {
      throw err;
    }

    res.redirect('/');
  });
};
