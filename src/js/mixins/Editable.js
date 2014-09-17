var Backbone = require('backbone');
var BaseFormView = require('../views/BaseFormView');

function setPrivateMethods()
{
    var formInstance;

    this.renderForm = function(e) {
        var $target = Backbone.$(e.target);
        if(!this.$el.add($target).hasClass('js-edit')) {
            return;
        }

        if(formInstance && Backbone.$.contains(formInstance.el, $target[0])) {
            // ignoring clicks from the form
            return;
        }

        if(this.isFormRendered()) {
            return;
        }

        formInstance = new this.formView({
            model: this.model,
            removeOnSave: true
        });

        formInstance.render();

        this.$el.append(formInstance.$el);

        formInstance.$('input,textarea').eq(0).focus();
    };

    this.getFormInstance = function() {
        return formInstance;
    };

    this.isFormRendered = function() {
        return !!formInstance && Backbone.$.contains(this.el, formInstance.el);
    };
}

var Editable = {
    events: {
        'click.editableMixin': 'renderForm',
    },

    initialize: function() {
        if(!this.formView) {
            throw Error('The view should have `formView` property');
        }

        if(!(this.formView.prototype instanceof BaseFormView)) {
            throw Error('The `formView` property value should be of type BaseFormView');
        }

        setPrivateMethods.apply(this);
    },
};

module.exports = Editable;