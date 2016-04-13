/**
 * AuthenticationsController
 *
 * @description :: Server-side logic for managing authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

module.exports = {
  facebook: function(req, res) {
    console.log("Authentications#facebook");
    passport.authenticate('facebook-token', function(error, user, info) {
      if (error) {
        return res.json(error);
      }
      res.json({ users: [user] });
    })(req, res);
  }
};
