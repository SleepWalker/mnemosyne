var Backbone = require('backbone');
var $ = require('jquery');

var PersonCardList = Backbone.View.extend({
    id: 'person-card-list',
    className: 'person-card-list',

    collection: require('../collections/PersonCollection'),
    itemView: require('../views/PersonCardView'),
    itemRenderDelay: 100,

    initialize: function(options)
    {
        $.extend(this, options);

        this.listenTo(this.collection, 'add', this.addItem);
    },

    render: function()
    {
        this.renderItems(this.$el);

        return this;
    },

    renderItems: function() {
        this.collection.forEach($.proxy(this.addItem, this));

        this.showDelayed();
    },

    addItem: function(model) {
        var view = new this.itemView({
            model: model
        });

        view.render();

        this.$el.append(view.el);
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

module.exports = PersonCardList;