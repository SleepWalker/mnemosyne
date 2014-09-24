var Backbone = require('backbone');

var contactTypeDropdown = require('./ContactTypeDropdownList');

var ContactManageFormItem = Backbone.View.extend({
    tagName: 'div',
    className: 'row',

    template: require('./tpl/contact-manage-form-item.handlebars'),

    initialize: function(options)
    {
        Backbone.$.extend(this, options);
    },

    render: function()
    {
        this.$el.html(this.template(Backbone.$.extend({
            dropdownId: contactTypeDropdown.el.id
        }, this.model.toJSON())));

        return this;
    }
});

module.exports = ContactManageFormItem;