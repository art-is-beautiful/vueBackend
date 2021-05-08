// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
// ));
const LocalStrategy = require('passport-local');
const jwt = require('jwt-simple');

const { UserDB } = require('../../users/models/UserDB');

const opts = {
  usernameField: 'email',
  passwordField: 'mypassword',
  passReqToCallback: true,
  session: false,
};

module.exports = new LocalStrategy(opts, async (req, email, mypassword, done) => {
  UserDB.checkPassword(email, mypassword).then((checkPasswordResponse) => {
    if (!checkPasswordResponse.flag) {
      return done({ message: checkPasswordResponse.message }, false);
    }

    const { user } = checkPasswordResponse;

    const accessToken = {
        id: user.getId(),
        expiresIn: new Date().setTime(new Date().getTime() + 1000000),
    };
  
    const refreshToken = {
        email: user.email,
        expiresIn: new Date().setTime(new Date().getTime() + 1000000),
    };

    const responseData = user.getInfo()

    responseData.tokens = {
      accessToken: jwt.encode(accessToken, 'super_secret'),
      accessTokenExpirationDate: accessToken.expiresIn,
      refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
      refreshTokenExpirationDate: refreshToken.expiresIn,
    };

    // user.tokens = { accessToken, refreshToken };

    return done(null, responseData);
  }).catch((err) => done({ message: err.message }, false));
});