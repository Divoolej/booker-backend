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
      unique: true
    },

    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    }, 

    facebookToken: {
      type: 'string',
      required: true
    },

    accessToken: {
      type: 'string',
      required: true,
      unique: true
    },

    links: {
      collection: 'link',
      via: 'userId'
    },

    categories: {
      collection: 'category',
      via: 'userId'
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
      userId: user.id
    }).exec(function(error, category) {
      if (error) { next(error); }
      else { next(); }
    });
  },

  generateAccessToken: function() {
    var token = "";
    for (var i = 0; i < 50; i++) {
      token += (Math.random() * 1000.0).toString(32);
    }
    return token;
  },

  authenticate: function(token, callback) {
    User.findOne({ accessToken: token }).exec(function(error, user) {
      if (error) {
        return callback(error, null);
      }
      callback(null, user);
    });
  }
};

