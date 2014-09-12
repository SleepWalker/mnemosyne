var Backbone = require('backbone');

var GroupCollection = Backbone.Collection.extend({
    model: require('../models/Group')
});

var collection = new GroupCollection();

module.exports = collection;