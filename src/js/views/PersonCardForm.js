var Backbone = require('backbone');

// TODO: group field on focus -> click (to show dd)

var BaseFormView = require('./BaseFormView');
var groupDropdown = require('./GroupDropdownView');

var PersonCardForm = BaseFormView.extend({
    className: 'persons-form',
    collection: require('../collections/PersonCollection'),
    template: require('./tpl/person-card-form.handlebars'),
    contactsForm: require('./ContactManageForm'),
    contactCollectionClass: require('../collections/ContactCollection'),

    render: function() {
        BaseFormView.prototype.render.apply(this, [].slice.call(arguments));

        this.renderContactsForm();

        this.renderDropDown();
    },

    renderDropDown: function() {
        this.$el.css({position: 'relative'});
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