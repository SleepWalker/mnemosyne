var Backbone = require('backbone');

var BaseFormView = require('./BaseFormView');

var GroupForm = BaseFormView.extend({
    className: 'group-form',
    
    collection: require('../collections/GroupCollection'),
    template: require('./tpl/group-form.handlebars'),
});

module.exports = GroupForm;