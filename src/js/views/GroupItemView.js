var Backbone = require('backbone');

// TODO: self-orderable

var GroupItemView = Backbone.View.extend({
    tagName: 'li',

    template: require('./tpl/a-name-view.handlebars'),

    initialize: function(options)
    {
        Backbone.$.extend(this, options);

        this.listenTo(this.model, 'change', this.render);
    },

    render: function()
    {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});

module.exports = GroupItemView;