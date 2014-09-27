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
        var Contact = require('../models/Contact');
        var $el = Backbone.$('<ul class="dropdown-menu">');

        Backbone.$.each(Contact.prototype.availableTypes, function(type, options) {
            $el.append('<li><a href="#" data-contact-type="' + type + '">' + options.label + '</a></li>');
        });

        this.$el.append($el);

        return this;
    },

    triggerChange: function(event) {
        event.preventDefault();

        var type = event.currentTarget.getAttribute('data-contact-type');
        this.trigger('change', type);
    }
});

var List = new ContactTypeDropdownList();
module.exports = List.render();
