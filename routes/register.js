const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const validate = require('../middleware/validate');

router.get('/', auth.getRegisterForm);
router.post(
  '/',
  validate.required('user[name]'),
  validate.required('user[pass]'),
  validate.lengthAbove('user[name]', 4),
  validate.lengthAbove('user[pass]', 4),
  auth.submitRegister
);

module.exports = router;
