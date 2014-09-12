var Backbone = require('backbone');

var template = require('./tpl/contact-card-form.handlebars');

var UserCardForm = Backbone.View.extend({
    tagName: 'div',
    className: 'contacts-form',

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

module.exports = UserCardForm;