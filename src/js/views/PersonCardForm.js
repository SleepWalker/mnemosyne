var Backbone = require('backbone');
var _ = require('underscore');

// TODO: group field on focus() -> click() on it to show dd

var BaseFormView = require('./BaseFormView');
var groupDropdown = require('./GroupDropdownView');

var PersonCardForm = BaseFormView.extend({
    className: 'person-form',
    collection: require('../collections/PersonCollection'),
    template: require('./tpl/person-card-form.handlebars'),
    contactsForm: require('./ContactManageForm'),
    contactCollectionClass: require('../collections/ContactCollection'),

    initialize: function(options)
    {
        BaseFormView.prototype.initialize.call(this, options);

        _.extend(this, _.pick(options, 'contactsForm'));
    },

    render: function() {
        BaseFormView.prototype.render.apply(this, [].slice.call(arguments));

        if (this.getModel().isNew()) {
            this.$el.addClass('person-form--new'); // TODO: test me
        }

        this.renderContactsForm();

        this.renderDropDown();
    },

    renderDropDown: function() {
        if(this.$el.css('position') == 'static') {
            // for drop down menu
            this.$el.css('position', 'relative');
        }

        this.$el.append(groupDropdown.$el);
        this.listenTo(groupDropdown, 'change', this.onChangeHandler);
    },

    renderContactsForm: function() {
        this.contactCollection = new this.contactCollectionClass(
            this.getModel().get('contacts')
            );
        var contactsForm = new this.contactsForm({
            collection: this.contactCollection,
        });
        contactsForm.render();

        this.$('#person-contacts').append(contactsForm.$el);
    },

    onChangeHandler: function(group) {
        this.$('[name=group]').val(group.get('name')).change();
        this.$('[name=groupId]').val(group.get('id')).change();
    },

    beforeSave: function() {
        this.getModel().set(
            'contacts',
            this.contactCollection.toJSON()
            );

        return true;
    }
});

module.exports = PersonCardForm;