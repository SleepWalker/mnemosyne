var Backbone = require('backbone');

var BaseFormView = require('./BaseFormView');

// the model should be private
var GroupForm = BaseFormView.extend({
    collection: require('../collections/GroupCollection'),
    template: require('./tpl/group-form.handlebars')
});

module.exports = GroupForm;