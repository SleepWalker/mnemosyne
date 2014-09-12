var Backbone = require('backbone');
var $ = require('jquery');

var ContactCardList = Backbone.View.extend({
    tagName: 'div',
    id: 'user-card-list',
    className: 'user-card-list',

    collection: require('../collections/ContactCollection'),
    itemView: require('../views/ContactCardView'),

    // btnName: 'Добавить контакт',

    initialize: function(options)
    {
        $.extend(this, options);
    },

    render: function()
    {
        this.renderItems(this.$el);

        return this;
    },

    renderItems: function($container) {
        this.collection.forEach($.proxy(function(model) {
            var view = new this.itemView({
                model: model
            });

            view.render();

            view.$el.addClass('active');

            $container.append(view.el);
        }, this));
    },
});

module.exports = ContactCardList;