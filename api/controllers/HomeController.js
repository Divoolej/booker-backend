/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `HomeController.hello()`
   */
  hello: function (req, res) {
    return res.json({
      message: "Hello From Sails!",
    });
  }
};

