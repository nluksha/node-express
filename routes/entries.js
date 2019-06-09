const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

const list = (req, res, next) => {
  Entry.getRange(0, -1, (err, entries) => {
    if (err) {
      return next(err);
    }

    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
};

router.get('/', list);

module.exports = router;
