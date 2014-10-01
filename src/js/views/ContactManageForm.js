var Backbone = require('backbone');
var _ = require('underscore');

var contactTypeDropdown = require('./ContactTypeDropdownList');

var ContactManageForm = Backbone.View.extend({
    className: 'contact-form',

    itemView: require('./ContactManageFormItem'),
    template: require('./tpl/contact-manage-form.handlebars'),

    initialize: function(options)
    {
        if(!this.collection) {
            this.collection = require('../collections/ContactCollection');
            this.collection = new this.collection();
        }

        this.listenTo(this.collection, 'add', this.addItem);
        this.listenTo(contactTypeDropdown, 'change', this.addButtonHandler);
    },

    render: function()
    {
        this.$el.html(this.template({
            dropdownId: contactTypeDropdown.el.id
        }));

        this.$el.append(contactTypeDropdown.$el);

        if(this.$el.css('position') == 'static') {
            // for drop down menu
            this.$el.css('position', 'relative');
        }
        
        if(this.collection && this.collection.length) {
            this.renderItems();
        } else {
            this.collection.add({});
        }

        return this;
    },

    renderItems: function() {
        this.collection.forEach(Backbone.$.proxy(this.addItem, this));
    },

    addItem: function(model) {
        var view = new this.itemView({
            model: model,
            removeOnSave: true
        });

        view.render();

        this.$('.js-contacts').append(view.el);
    },

    addButtonHandler: function(type) {
        this.collection.add({
            type: type
        });
    }
});

module.exports = ContactManageForm;