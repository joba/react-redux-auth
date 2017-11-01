const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook, encrypt password
// .pre = runs before model gets saved
userSchema.pre('save', function(next) {
  // Gets access to user model
  const user = this;

  // Generate salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }

    // Hash(encrypt) password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      // Overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// compare password for login
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
