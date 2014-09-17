var Backbone = require('backbone');
var $ = require('jquery');

var GroupAddAction = Backbone.View.extend({
    className: 'group-add-container',

    formView: require('./GroupForm'),
    template: require('./tpl/group-add-action.handlebars'),

    render: function()
    {
        this.$el.html(this.template());

        return this;
    },
});

module.exports = GroupAddAction;

// mixing in some basic behavior
require('backbone.cocktail').mixin(module.exports,
    require('../mixins/Editable')
    );