const Entry = require('../models/entry');

exports.entries = (req, res, next) => {
  const page = req.page;
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) {
      return next(err);
    }

    res.json(entries);
  });
};

exports.getCount = cb => {
  Entry.count(cb);
};

exports.submit = (req, res) => {
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

    if (req.remoteUser) {
      res.json({ message: 'Entry added.'});
    } else {
      res.sendStatus(404);
    }
  });
};
