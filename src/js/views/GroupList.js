var Backbone = require('backbone');

var GroupList = Backbone.View.extend({
    tagName: 'ul',

    collection: require('../collections/GroupCollection'),
    itemView: require('../views/GroupItemView'),
    itemViewOptions: {},

    initialize: function(options)
    {
        Backbone.$.extend(this, options);

        this.listenTo(this.collection, 'add', this.render);
    },

    render: function()
    {
        this.$el.empty();

        var noGroupItem = new this.collection.model({
            name: 'No Group',
        });

        var view = this.renderItem(noGroupItem);
        view.$el.addClass('js-no-group');

        this.renderItems();

        return this;
    },

    renderItems: function() {
        this.collection.forEach(Backbone.$.proxy(this.renderItem, this));
    },

    renderItem: function(model, where) {
        where = 'string' == typeof where ? where : 'append';

        var options = Backbone.$.extend({},
            this.itemViewOptions,
            {model: model}
            );

        var view = new this.itemView(options);

        view.render();

        view.$el.addClass('display');

        this.$el[where](view.el);

        return view;
    },
});

module.exports = GroupList;