const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const validate = require('../middleware/validate');

router.get('/', auth.getLoginForm);
router.post(
  '/',
  validate.required('user[name]'),
  validate.required('user[pass]'),
  auth.submitLogin
);

module.exports = router;
