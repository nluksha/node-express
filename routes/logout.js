const express = require('express');
const router = express.Router();
const User = require('../models/user');
const validate = require('../middleware/validate');

const logout = (req, res) => {
  req.session.destroy(err => {
    if(err) {
      throw err;
    }

    res.redirect('/');
  });
};

router.get('/', logout);

module.exports = router;
