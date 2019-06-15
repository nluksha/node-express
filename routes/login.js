const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const validate = require('../middleware/validate');

router.get('/', login.form);
router.post(
  '/',
  validate.required('user[name]'),
  validate.required('user[pass]'),
  login.submit
);

module.exports = router;
