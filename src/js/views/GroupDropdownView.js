var Backbone = require('backbone');

require('../vendor/jquery.dropdown');

var GroupList = require('./GroupList');

var view;
var GroupDropdownList = Backbone.View.extend({
    className: 'dropdown-content dropdown-relative',
    id: 'dropdown-group',

    initialize: function() {
        this.$el.attr('data-dropdown-content', true);

        // binding event to body to prevent from
        Backbone.$('body').on(
            'click', '#dropdown-group a',
            Backbone.$.proxy(this.triggerChange, this)
        );
    },

    render: function() {
        view = new GroupList({
            className: 'dropdown-menu',
        });

        this.$el.append(view.render().$el);

        return this;
    },

    triggerChange: function(event) {
        event.preventDefault();

        var modelId = event.currentTarget.getAttribute('data-model-id');
        var model = view.collection.get(modelId);
        if(!model) {
            model = new view.collection.model();
        }
        this.trigger('change', model);
    }
});

var List = new GroupDropdownList();
module.exports = List.render();
