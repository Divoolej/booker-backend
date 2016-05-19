/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: function(req, res) {
    var query = {};
    if (req.query.userId) { query.userId = req.query.userId; }
    if (req.query.id) { query.id = req.query.id; }
    if (req.query.name) { query.name = req.query.name; }
    if (req.query.limit) { query.limit = req.query.limit; }
    Category.find(query).exec(function(error, categories) {
      if (error) {
        return res.json(error);
      } else {
        return res.json({ categories: categories });
      }
    });
  },

};

