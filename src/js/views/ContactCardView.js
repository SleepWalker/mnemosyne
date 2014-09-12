var Backbone = require('backbone');

var template = require('./tpl/contact-card.handlebars');

var ContactCardView = Backbone.View.extend({
    tagName: 'div',
    className: 'user-card',

    initialize: function(options)
    {
        this.model = options.model;
    },

    render: function()
    {
        this.$el.html(template(this.model.toJSON()));

        return this;
    }
});

module.exports = ContactCardView;