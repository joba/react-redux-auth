const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local Strategy
// expects field to be username, so we pass in our name
const localLogin = new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  // Verify email, password - call done if correct
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }

    if(!user) {
      return done(null, false);
    }

    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    });

  });
  // call done with false if error
});

// Setup options for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};


// create jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if user id in payload exists in db, if it does call done with that user,
  // If not, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    }else {
      // No error, but user is not found
      done(null, false);
    }
  });
});

// Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
