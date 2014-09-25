var Backbone = require('backbone');

var GroupCollection = Backbone.Collection.extend({
    model: require('../models/Group'),

    url: '/group',

    comparator: 'name'
});

var collection = new GroupCollection();

module.exports = collection;