var Backbone = require('backbone');

var GroupList = Backbone.View.extend({
    tagName: 'ul',

    collection: require('../collections/GroupCollection'),
    itemView: require('../views/GroupItemView'),

    initialize: function(options)
    {
        Backbone.$.extend(this, options);

        this.listenTo(this.collection, 'add', this.render);
    },

    render: function()
    {
        this.$el.empty();

        var noGroupItem = new this.collection.model({
            name: 'No Group (todo)',
        });

        this.renderItem(noGroupItem);

        this.renderItems();

        return this;
    },

    renderItems: function() {
        this.collection.forEach(Backbone.$.proxy(this.renderItem, this));
    },

    renderItem: function(model, where) {
        where = 'string' == typeof where ? where : 'append';

        var view = new this.itemView({
            model: model
        });

        view.render();

        view.$el.addClass('display');

        this.$el[where](view.el);
    },
});

module.exports = GroupList;