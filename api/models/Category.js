/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    links: {
      collection: 'link',
      via: 'categoryId'
    },

    userId: {
      model: 'user',
      required: true
    },

    name: {
      type: 'string',
      required: true,
    }
  },

  afterValidate: function (attributes, next) {
    Category.findOne({
      name: attributes.name,
      userId: attributes.userId
    }).exec(function(error, category){
        if(error) return next(error);
        if(category) return next('Category must be unique in scope of one user.');
        next(null, attributes);
    });
  },
};

