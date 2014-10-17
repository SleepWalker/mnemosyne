var Backbone = require('backbone');

var contactTypeDropdown = require('./ContactTypeDropdownList');
var BaseFormView = require('./BaseFormView');

var ContactManageFormItem = BaseFormView.extend({
    tagName: 'div',
    className: 'contact-row',

    template: require('./tpl/contact-manage-form-item.handlebars'),

    initialize: function(options)
    {
        Backbone.$.extend(this, options);

        BaseFormView.prototype.initialize.apply(this, [].slice.call(arguments));
    },

    render: function()
    {
        var model = this.getModel();
        var html = this.template(Backbone.$.extend({
            dropdownId: contactTypeDropdown.el.id,
            typeLabel: model.getTypeLabel(),
            valuePlaceholder: model.getValuePlaceholder(),
            validatorPattern: model.getValidatorPattern(),
            validatorType: model.getValidatorType()
        }, this.getModel().toJSON()));

        this.wrapInForm(html)
            .appendTo(this.$el)
            ;

        this.inputs().on(
            'change',
            Backbone.$.proxy(this.populateModel, this)
        );

        return this;
    }
});

module.exports = ContactManageFormItem;
