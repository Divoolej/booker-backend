/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'account',

  attributes: {
    facebookId: {
      type: 'string',
      required: true,
    },

    firstName: {
      type: 'string',
      required: true,
    },

    lastName: {
      type: 'string',
      required: true,
    }, 

    facebookToken: {
      type: 'string',
      required: true,
    },

    toJSON: function() {
      var self = this.toObject();
      delete self.facebookToken;
      return self;
    }
  },
};

