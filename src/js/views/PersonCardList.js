var Backbone = require('backbone');
var $ = require('jquery');

var PersonCardList = Backbone.View.extend({
    id: 'person-card-list',
    className: 'person-card-list',

    collection: require('../collections/PersonCollection'),
    itemView: require('../views/PersonCardView'),

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
    },

    addItem: function(model) {
        var view = new this.itemView({
            model: model
        });

        view.render();

        view.$el.addClass('display');

        this.$el.append(view.el);
    }
});

module.exports = PersonCardList;