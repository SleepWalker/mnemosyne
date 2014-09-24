var Backbone = require('backbone');

var contactTypeDropdown = require('./ContactTypeDropdownList');

var ContactManageForm = Backbone.View.extend({
    className: 'contact-form',
    style: 'position: relative',

    collection: require('../collections/ContactCollection'),
    itemView: require('./ContactManageFormItem'),
    template: require('./tpl/contact-manage-form.handlebars'),

    initialize: function(options)
    {
        Backbone.$.extend(this, options);

        // this.listenTo(this.collection, 'add', this.addItem);
    },

    render: function()
    {
        this.$el.html(this.template({
            dropdownId: contactTypeDropdown.el.id
        }));

        this.$el.append(contactTypeDropdown.$el);
        // this.listenTo(contactTypeDropdown, 'change', this.onChangeHandler);
        
        var view = new this.itemView({
            model: new Backbone.Model()
        });
        view.render();
        this.$('.js-contacts').append(view.$el);

        // this.renderItems(this.$('js-contacts'));

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

module.exports = ContactManageForm;