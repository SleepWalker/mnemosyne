var Backbone = require('backbone');

var ContactCollection = Backbone.Collection.extend({
    model: require('../models/Contact'),

    comparator: 'type',
});

module.exports = ContactCollection;