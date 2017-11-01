const auth = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({foo: 'bar'});
  });
  app.post('/signup', auth.signup);
  app.post('/signin', requireSignin, auth.signin);
}
