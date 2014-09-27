var Backbone = require('backbone');

var Contact = Backbone.Model.extend({

    defaults: {
        type: 'phone',
        label: '',
        value: ''
    },

    getTypeLabel: function() {
        var options = this.getOptions();
        return options ? options.label : '';
    },

    getValuePlaceholder: function() {
        var options = this.getOptions();
        return options ? options.placeholder : '';
    },

    getOptions: function() {
        return this.availableTypes[this.get('type')] || {};
    },

    availableTypes: {
        email: {
            label: 'Email',
            placeholder: 'mymail@example.com'
        },
        phone: {
            label: 'Phone',
            placeholder: '+99 (123) 123-45-67'
        },
        url: {
            label: 'Website',
            placeholder: 'example.com'
        },
        address: {
            label: 'Street address',
            placeholder: 'Ukraine, Kiev, str. Exmple, 5, app. 7'
        },
        custom: {
            label: 'Custom field',
            placeholder: 'Your custom value'
        }
    }
});

module.exports = Contact;