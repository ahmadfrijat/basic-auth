'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('../models/users-model.js')


module.exports = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':');
  const valid = await Users.checkUser({ username, password });
  if (valid) {
    req.userInfo = { user: valid };
    next();
  } else {
    next('invalid name or password');
  }
};
