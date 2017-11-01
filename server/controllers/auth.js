const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  // sub = subject of this token, iat = issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // email and password is ok, give user a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // Does user already exists?
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // Does exist, return error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // Doesnt exist, create user
    const user = new User({
      email: email,
      password: password
    });

    // Save created user to db
    user.save(function(err) {
      if(err) {
        return next(err);
      }

      res.json({ token: tokenForUser(user) });
    });

  });
}
