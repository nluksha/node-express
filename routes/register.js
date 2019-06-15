const express = require('express');
const router = express.Router();
const register = require('../controllers/register');
const validate = require('../middleware/validate');

router.get('/', register.form);
router.post(
  '/',
  validate.required('user[name]'),
  validate.required('user[pass]'),
  validate.lengthAbove('user[name]', 4),
  validate.lengthAbove('user[pass]', 4),
  register.submit
);

module.exports = router;
