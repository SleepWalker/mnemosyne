var Backbone = require('backbone');

var BaseFormView = require('./BaseFormView');

// the model should be private
var UserCardForm = BaseFormView.extend({
    collection: require('../collections/ContactCollection'),
    template: require('./tpl/contact-card-form.handlebars')
});

module.exports = UserCardForm;