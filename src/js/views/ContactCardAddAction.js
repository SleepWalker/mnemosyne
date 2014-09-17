var Backbone = require('backbone');
var $ = require('jquery');

var ContactCardAddAction = Backbone.View.extend({
    className: 'contact-add-container',

    formView: require('./ContactCardForm'),
    template: require('./tpl/contact-add-action.handlebars'),

    render: function()
    {
        this.$el.html(this.template());

        return this;
    },
});

module.exports = ContactCardAddAction;

// mixing in some basic behavior
require('backbone.cocktail').mixin(module.exports,
    require('../mixins/Editable')
    );