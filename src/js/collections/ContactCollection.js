var Backbone = require('backbone');

var ContactCollection = Backbone.Collection.extend({
    model: require('../models/Contact')
});

var collection = new ContactCollection();

module.exports = collection;