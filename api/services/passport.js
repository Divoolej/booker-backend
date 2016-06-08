var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
    clientID: sails.config.FACEBOOK_APP_ID,
    clientSecret: sails.config.FACEBOOK_APP_SECRET
  }, function(accessToken, refreshToken, profile, done) {
    console.log("RefreshToken:", refreshToken);
    // Check if a user with the given facebookId exists
    User.findOne({ facebookId: profile.id }).exec(function (error, user) {
      if (error) { // Return if there was an error
        return done(error, null);
      } else { // Return the user if it exists
        if (user) {
          return done(null, user);
        } else { // If the user doesn't exist, create a new one
          var attributes = {
            facebookId: profile.id,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            facebookToken: accessToken,
            avatarUrl: profile.photos[0].value,
            accessToken: User.generateAccessToken()
          };
          User.create(attributes).exec(function (error, new_user) {
            return done(error, new_user);
          });
        }
      }
    });
  }
));
