var Backbone = require('backbone');

require('../vendor/jquery.dropdown');


var view;
var ContactTypeDropdownList = Backbone.View.extend({
    className: 'dropdown-content dropdown-relative',
    id: 'dropdown-contact-type',

    initialize: function() {
        this.$el.attr('data-dropdown-content', true);

        // binding event to body to prevent from
        Backbone.$('body').on(
            'click', '#'+this.id+' a',
            Backbone.$.proxy(this.triggerChange, this)
        );
    },

    render: function() {
        var $el = Backbone.$('<ul class="dropdown-menu">');
        $el.append('<li><a href="#1">Item 1</a></li>');
        $el.append('<li><a href="#2">Item 2</a></li>');
        $el.append('<li><a href="#3">Item 3</a></li>');
        $el.append('<li><a href="#4">Item 4</a></li>');
        $el.append('<li><a href="#5">Item 5</a></li>');
        $el.append('<li><a href="#6">Item 6</a></li>');

        this.$el.append($el);

        return this;
    },

    triggerChange: function(event) {
        event.preventDefault();

        // var modelId = event.currentTarget.getAttribute('data-model-id');
        // var model = view.collection.get(modelId);
        // if(!model) {
        //     model = new view.collection.model();
        // }
        // this.trigger('change', model);
    }
});

var List = new ContactTypeDropdownList();
module.exports = List.render();
