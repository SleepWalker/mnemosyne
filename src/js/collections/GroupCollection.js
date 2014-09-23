var Backbone = require('backbone');

var GroupCollection = Backbone.Collection.extend({
    model: require('../models/Group'),

    comparator: 'name'
});

var collection = new GroupCollection();

module.exports = collection;