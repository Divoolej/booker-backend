/**
 * VisitsController
 *
 * @description :: Server-side logic for managing visits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `VisitsController.create()`
   */
  create: function (req, res, next) {
    var params = req.params.all();
    console.log("Visit.create params=", params);

    Visit.create(params, function(error, newVisit) {
      if (error) return next(error);

      res.status(201);
      res.json(newVisit);
    });
  },


  /**
   * `VisitsController.find()`
   */
  find: function (req, res, next) {
    var id = req.param('id');

    if (id) {
      Visit.findOne(id, function(error, visit) {
        if (visit === undefined) return next(error);
        res.json(visit);
      });
    } else {
      var where = req.param('where');

      if (_.isString(where)) {
        where = JSON.parse(where);
      }

      var options = {
        limit: req.param('limit') || undefined,
        skip: req.param('skip') || undefined,
        sort: req.param('sort') || undefined,
        where: where || undefined
      };

      console.log("The options:", options);

      Visit.find(options, function(error, visit) {
        if (visit === undefined) return res.notFound();

        if (error) return next(error);

        res.json(visit);
      });
    }
  }
};

