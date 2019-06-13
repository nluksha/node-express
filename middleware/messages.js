const express = require('express');

function messages(req) {
  return (msg, type) => {
    const messageType = type || 'info';
    const session = req.session;
    session.messages = session.messages || [];

    session.messages.push({
      type: messageType,
      string: msg
    });
  }
}

module.exports = (req, res, next) => {
  res.messages = messages(req);
  res.error = msg => {
    return res.messages(msg, 'error');
  };

  res.locals.messages = req.session.messages || [];
  res.locals.removeMessages = () => {
    req.session.messages = [];
  };

  next();
}