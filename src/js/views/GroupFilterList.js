var Backbone = require('backbone');

var GroupFilterList = require('./GroupList').extend({
    id: 'group-list',
    className: 'group-list',

    itemView: require('../views/GroupFilterItemView'),

    events: {
        'click li': 'setActiveItem',
    },

    setActiveItem: function(e) {
        this.$('li').removeClass('active');

        Backbone.$(e.currentTarget).addClass('active');

        e.preventDefault();
    }
});

module.exports = GroupFilterList;

require('backbone.cocktail').mixin(module.exports, {
    render: function()
    {
        var allGroupsItem = new this.collection.model({
            name: 'All Groups',
        });

        this.renderItem(allGroupsItem, 'prepend');

        this.$('li').eq(0).addClass('active');

        return this;
    }
});
