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


};
