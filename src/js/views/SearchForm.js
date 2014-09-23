var Backbone = require('backbone');

var template = require('./tpl/search-form.handlebars');

var SearchForm = Backbone.View.extend({
    tagName: 'div',

    collection: require('../collections/PersonCollection'),

    events: {
        'change input': 'applyCriterium',
        'keyup input': 'applyCriterium'
    },

    initialize: function(options)
    {
        if(options && options.collection) {
            this.collection = options.collection;
        }
    },

    render: function()
    {
        this.$el.html(template());

        return this;
    },

    applyCriterium: function() {
        var text = this.$('input[type=text]').val();
        this.collection.setTextCriterium(text ? text : null);
    }
});

module.exports = SearchForm;