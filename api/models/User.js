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

    links: {
      collection: 'link',
      via: 'owner'
    },

    categories: {
      collection: 'category',
      via: 'owner'
    },

    toJSON: function() {
      var self = this.toObject();
      delete self.facebookToken;
      return self;
    }
  },

  afterCreate: function(user, next) {
    this.createDefaultCategory(user, next);
  },

  createDefaultCategory: function(user, next) {
    Category.create({
      name: 'General',
      owner: user.id
    }).exec(function(error, category) {
      if (error) { next(error); }
      else { next(); }
    });
  },
};

