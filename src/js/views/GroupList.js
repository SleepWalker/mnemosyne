var Backbone = require('backbone');
var $ = require('jquery');

var GroupList = Backbone.View.extend({
    tagName: 'ul',
    id: 'group-list',
    className: 'group-list',

    collection: require('../collections/GroupCollection'),
    itemView: require('../views/GroupItemView'),

    // btnName: 'Добавить контакт',

    initialize: function(options)
    {
        $.extend(this, options);
    },

    render: function()
    {
        this.renderItems(this.$el);

        this.renderAddBtn(this.$el);

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

    renderAddBtn: function($container) {
        // var btn = new BtnView({
        //     title: this.btnName
        // });
        // btn.render();

        // $container.append(btn.$el);
        $container.append('<button>btn</button>');
    }
});

module.exports = GroupList;