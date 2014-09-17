var Backbone = require('backbone');
var $ = require('jquery');

var GroupList = Backbone.View.extend({
    tagName: 'ul',
    id: 'group-list',
    className: 'group-list',

    collection: require('../collections/GroupCollection'),
    itemView: require('../views/GroupItemView'),

    events: {
        'click li': 'setActiveItem',
    },


    initialize: function(options)
    {
        $.extend(this, options);

        this.listenTo(this.collection, 'add', this.render);
    },

    render: function()
    {
        this.$el.empty();

        var allGroupsItem = new this.collection.model({
            name: 'All Groups',
        });

        this.renderItem(allGroupsItem);

        this.$('li').eq(0).addClass('active');

        this.renderItems();

        return this;
    },

    renderItems: function() {
        this.collection.forEach($.proxy(this.renderItem, this));
    },

    renderItem: function(model) {
        var view = new this.itemView({
            model: model
        });

        view.render();

        view.$el.addClass('display');

        this.$el.append(view.el);
    },

    setActiveItem: function(e) {
        this.$('li').removeClass('active');

        $(e.currentTarget).addClass('active');

        e.preventDefault();
    },
});

module.exports = GroupList;