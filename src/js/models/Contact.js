var Backbone = require('backbone');

var Contact = Backbone.Model.extend({

    defaults: {
        type: 'phone',
        label: '',
        value: ''
    },

    getTypeLabel: function() {
        return this.getOption('label');
    },

    getValuePlaceholder: function() {
        return this.getOption('placeholder');
    },

    getValidatorType: function() {
        return this.getOption('validatorType');
    },

    getValidatorPattern: function() {
        return this.getOption('validatorPattern');
    },

    getOption: function(key) {
        var options = this.getOptions();
        return options ? options[key] : '';
    },

    getOptions: function() {
        return this.availableTypes[this.get('type')] || {};
    },

    availableTypes: {
        email: {
            label: 'Email',
            validatorType: 'email',
            placeholder: 'mymail@example.com'
        },
        phone: {
            label: 'Phone',
            validatorPattern: '[\\d\\-\\(\\) ]+',
            placeholder: '+99 (123) 123-45-67'
        },
        url: {
            label: 'Website',
            validatorType: 'url',
            placeholder: 'example.com'
        },
        address: {
            label: 'Address',
            placeholder: 'Ukraine, Kiev, str. Exmple, 5, app. 7'
        },
        custom: {
            label: 'Custom',
            placeholder: 'Your custom value'
        }
    }
});

module.exports = Contact;