var Backbone = require('backbone');

var contactCollection = require('../collections/ContactCollection');

var GroupItemView = Backbone.View.extend({
    tagName: 'li',

    formView: require('./GroupForm'),
    template: require('./tpl/group-item.handlebars'),

    events: {
        'click': 'setCriterium',
    },

    initialize: function(options)
    {
        this.model = options.model;

        this.listenTo(this.model, 'change', this.render);
    },

    render: function()
    {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },

    setCriterium: function() {
        var id = this.model.id ? this.model.id : null;
        contactCollection.setGroupCriterium(id);
    },
});

module.exports = GroupItemView;

// mixing in some basic behavior
require('backbone.cocktail').mixin(module.exports,
    require('../mixins/Deletable'),
    require('../mixins/Editable')
    );