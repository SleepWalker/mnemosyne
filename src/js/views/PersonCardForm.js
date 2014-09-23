var Backbone = require('backbone');

// TODO: group field on focus -> click (to show dd)

var BaseFormView = require('./BaseFormView');
var groupDropdown = require('./GroupDropdownView');

var PersonCardForm = BaseFormView.extend({
    collection: require('../collections/PersonCollection'),
    template: require('./tpl/person-card-form.handlebars'),

    render: function() {
        BaseFormView.prototype.render.apply(this, [].slice.call(arguments));


        this.$el.css({position: 'relative'});
        this.$el.append(groupDropdown.$el);
        this.listenTo(groupDropdown, 'change', this.onChangeHandler);
    },

    onChangeHandler: function(group) {
        this.$('[name=group]').val(group.get('name'));
        this.$('[name=groupId]').val(group.get('id'));
    }
});

module.exports = PersonCardForm;