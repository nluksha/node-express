const express = require('express');
const router = express.Router();
const entries = require('../controllers/entries');
const validate = require('../middleware/validate');

router.get('/', entries.form);
router.post('/', 
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]', 4),
  entries.submit
);

module.exports = router;