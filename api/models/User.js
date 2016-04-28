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

    accessToken: {
      type: 'string',
      required: true,
    },

    toJSON: function() {
      var self = this.toObject();
      delete self.facebookToken;
      delete self.accessToken;
      return self;
    }
  },

  generateAccessToken() {
    var token = "";
    for (var i = 0; i < 5; i++) {
      token += (Math.random()*1000000000000000000).toString(16);
    }
    return token; // A TEMPORARY SOLUTION
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

