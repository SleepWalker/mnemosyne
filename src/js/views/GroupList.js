var Backbone = require('backbone');

var GroupList = Backbone.View.extend({
    tagName: 'ul',

    collection: require('../collections/GroupCollection'),
    itemView: require('../views/GroupItemView'),
    itemViewOptions: {},
    itemRenderDelay: 50,

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

        // 1ms to get into async flow and let mixins and derivatives
        // to init their stuff
        this.showDelayed();
    },

    renderItem: function(model, where) {
        where = 'string' == typeof where ? where : 'append';

        var options = Backbone.$.extend({},
            this.itemViewOptions,
            {model: model}
            );

        var view = new this.itemView(options);

        view.render();

        this.$el[where](view.el);

        return view;
    },

    /**
     * Recursively with delay applies .display class
     * for animation purposes
     */
    // TODO: move into separate unit
    showDelayed: function($next) {
        setTimeout(Backbone.$.proxy(function() {
            if(!$next) {
                $next = this.$el.children().first();
            }
            $next.addClass('display');
            $next = $next.next();
            if($next.length > 0) {
                this.showDelayed($next);
            }
        }, this), this.itemRenderDelay);
    }
});

module.exports = GroupList;