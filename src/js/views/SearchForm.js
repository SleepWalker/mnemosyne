var Backbone = require('backbone');

var template = require('./tpl/search-form.handlebars');

var SearchForm = Backbone.View.extend({
    tagName: 'div',

    initialize: function(options)
    {
        // this.collection = options.collection;
    },

    render: function()
    {
        this.$el.html(template());
        // this.$el.html(template(model.toJSON()));

        return this;
    }
});

module.exports = SearchForm;