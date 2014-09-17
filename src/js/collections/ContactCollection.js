var Backbone = require('backbone');

var searchCriterium = {
    groupId: null,
    text: null,
};

var ContactCollection = Backbone.Collection.extend({
    model: require('../models/Contact'),

    comparator: 'surname',

    setGroupCriterium: function(groupId) {
        searchCriterium.groupId = groupId ? groupId : null;

        this.triggerSearch();
    },

    setTextCriterium: function(text) {
        searchCriterium.text = text ? text : null;

        this.triggerSearch();
    },

    getCriterium: function() {
        return searchCriterium;
    },

    triggerSearch: function() {
        this.trigger('search', this.getCriterium());
    }
});

var collection = new ContactCollection();

module.exports = collection;