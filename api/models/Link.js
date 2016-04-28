/**
 * Link.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    owner: {
      model: 'user',
      required: true
    },

    category: {
      model: 'category',
      required: true
    },

    url: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string'
    },
  }
};

