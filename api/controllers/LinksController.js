/**
 * LinksController
 *
 * @description :: Server-side logic for managing links
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res) {
    var query = {};
    if (req.query.userId) { query.userId = req.query.userId; }
    if (req.query.id) { query.id = req.query.id; }
    if (req.query.limit) { query.limit = req.query.limit; }
    Link.find(query).exec(function(error, links) {
      if (error) {
        return res.json(error);
      } else {
        return res.json({ links: links });
      }
    });
  },

  show: function(req, res) {
    if (!req.params.id) {
      return res.notFound();
    } else {
      Link.findOne({ id: req.params.id }).exec(function(error, link) {
        if (error || !link) {
          return res.notFound();
        } else {
          return res.json(link);
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
        title: req.body.link.title,
        url: req.body.link.url,
        categoryId: req.body.link.categoryId,
        userId: user.id
      };
      Category.findOne({ id: attributes.categoryId, userId: attributes.userId }).exec(function(error, category) {
        if (error || !category) {
          return res.json(400, error);
        }
        Link.create(attributes).exec(function(error, link) {
          if (error) {
            return res.badRequest(error);
          }
          return res.json(201, link);
        });
      });
    });
  },

  update: function(req, res) {
    User.authenticate(req.headers.auth_token, function(error, user) {
      if (error || !user) {
        return res.json(401, null);
      }
      var id = req.params.id;
      Link.findOne({ id: id, userId: user.id }).exec(function(error, link) {
        if (error || !link) {
          return res.notFound(error);
        }
        var new_attributes = {
          title: req.body.title,
          categoryId: req.body.categoryId
        };
        for (var attribute in new_attributes) {
          link[attribute] = new_attributes[attribute];
        }
        link.save(function(error) {
          if (error) { 
            return res.json(400, error);
          }
          return res.json(link);
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
      Link.findOne({ id: id, userId: user.id }).exec(function(error, link) {
        if (error || !link) {
          return res.notFound(error);
        }
        Link.destroy({id: link.id}).exec(function(error) {
          if (error) {
            return res.navigate(error);
          }
          return res.ok();
        });
      });
    });
  }
};
