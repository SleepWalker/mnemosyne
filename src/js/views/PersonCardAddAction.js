var Backbone = require('backbone');
var $ = require('jquery');

var PersonCardAddAction = Backbone.View.extend({
    className: 'person-add-container',

    formView: require('./PersonCardForm'),
    template: require('./tpl/person-add-action.handlebars'),

    render: function()
    {
        this.$el.html(this.template());

        return this;
    },
});

module.exports = PersonCardAddAction;

// mixing in some basic behavior
require('backbone.cocktail').mixin(module.exports,
    require('../mixins/Editable'),
    require('../mixins/Morph')
    );