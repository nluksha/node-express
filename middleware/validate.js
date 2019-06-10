function parceField(field) {
  return field
    .split(/\[|\]/)
    .filter(s => s);
}

function getField(req, field) {
  let val = req.body;
  field.forEach(prop => val = val[prop]);

  return val;
}

exports.required = fieldProp => {
  const field = parceField(fieldProp);

  return (req, res, next) => {
    if (getField(req, field)) {
      next();
    } else {
      next(new Error(`${field.join(' ')} is required`));
      // res.error(`${field.join(' ')} is required`);
      // res.redirect('back');
    }
  }
};

exports.lengthAbove = (fieldProp, len) => {
  const field = parceField(fieldProp);

  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      next(new Error(`${field.join(' ')} must be more than ${len} characters`));
      // res.error(`${field.join(' ')} must be more than ${len} characters`);
      // res.redirect('back');
    }
  }
};