var Backbone = require('backbone');
var $ = require('jquery');

var ContactCardList = Backbone.View.extend({
    id: 'user-card-list',
    className: 'user-card-list',

    collection: require('../collections/ContactCollection'),
    itemView: require('../views/ContactCardView'),

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

module.exports = ContactCardList;