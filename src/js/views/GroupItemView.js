var Backbone = require('backbone');

var template = require('./tpl/group-item.handlebars');

var GroupItemView = Backbone.View.extend({
    tagName: 'li',

    initialize: function(options)
    {
        this.model = options.model;
    },

    render: function()
    {
        this.$el.html(template(this.model.toJSON()));

        return this;
    }
});

module.exports = GroupItemView;