/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: function(req, res) {
    var id = req.param('id')
    if (id) {
      User.findOne(id, function(error, user) {
        if (error) {
          res.serverError(error);
        } else if (user) {
          res.json({ "user": user });
        } else {
          res.json({ "user": {} });
        }
      });
    }
  }
};

