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

  show: function(req, res) {
    if (!req.params.id) {
      return res.notFound();
    } else {
      Category.findOne({ id: req.params.id }).exec(function(error, category) {
        if (error || !category) {
          return res.notFound();
        } else {
          Link.find({categoryId: category.id}).exec(function(error, links) {
            if (error) {
              return res.notFound(error);
            } else {
              return res.json({category: category, links: links});
            }
          });
        }
      });
    }
  },

  create: function(req, res) {
    User.authenticate(req.headers.auth_token, function(error, user) {
      if (error || !user) { 
        return res.forbidden(error);
      }
      var attributes = {
        name: req.body.name,
        userId: user.id
      };
      Category.create(attributes).exec(function(error, category) {
        if (error) {
          return res.badRequest(error);
        }
        return res.json(201, category);
      });
    });
  },

  update: function(req, res) {
    User.authenticate(req.headers.auth_token, function(error, user) {
      if (error || !user) {
        return res.json(401, null);
      }
      var id = req.params.id;
      Category.findOne({ id: id, userId: user.id }).exec(function(error, category) {
        if (error || !category) {
          return res.notFound(error);
        }
        var new_attributes = {
          name: req.body.name
        };
        for (var attribute in new_attributes) {
          category[attribute] = new_attributes[attribute];
        }
        category.save(function(error) {
          if (error) { 
            return res.json(400, error);
          }
          return res.json(category);
        });
      });
    });
  },

  destroy: function(req, res) {
    User.authenticate(req.headers.auth_token, function(error, user) {
      if (error || !user) {
        return res.json(401, null);
      }
      var id = req.params.id;
      Category.findOne({ id: id, userId: user.id }).exec(function(error, category) {
        if (error || !category) {
          return res.notFound(error);
        }
        Link.destroy({categoryId: category.id}).exec(function(error) {
          log.error(error);
        });
        Category.destroy({id: category.id}).exec(function(error) {
          if (error) {
            return res.navigate(error);
          }
          return res.ok();
        });
      });
    });
  }
};

