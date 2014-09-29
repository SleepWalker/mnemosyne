var Backbone = require('backbone');
var _ = require('underscore');
var BaseFormView = require('../views/BaseFormView');

function setPrivateMethods()
{
    var formInstance;

    this.renderForm = function(event) {
        var $target = Backbone.$(event.target);
        if(!this.$el.add($target).hasClass('js-edit')) {
            return;
        }

        if(formInstance && Backbone.$.contains(formInstance.el, $target[0])) {
            // ignoring clicks from the form
            return;
        }
        
        event.preventDefault();

        if(this.isFormRendered()) {
            return;
        }

        formInstance = new this.formView({
            model: this.model,
            removeOnSave: true
        });

        formInstance.render();

        this.$formRenderTarget.append(formInstance.$el);

        formInstance.$('input,textarea').eq(0).focus();

        this.listenToTransitions(formInstance);
    };

    this.listenToTransitions = function(formInstance) {
        var transitionEndEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
        formInstance.$el
            .addClass('active')
            .on(transitionEndEvents, function() {
                if(!formInstance.$el.hasClass('active')) {
                    formInstance.remove();
                }
            })
            ;

        formInstance.remove = function() {
            formInstance.$el.removeClass('active');
        };
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

    initialize: function(options) {
        if(!this.formView) {
            throw Error('The view should have `formView` property');
        }

        if(!(this.formView.prototype instanceof BaseFormView)) {
            throw Error('The `formView` property value should be of type BaseFormView');
        }

        _.defaults(this, {
            $formRenderTarget: this.$el
        });
        _.extend(this, _.pick(options, '$formRenderTarget'));
        this.$formRenderTarget = Backbone.$(this.$formRenderTarget);

        setPrivateMethods.apply(this);
    },
};

module.exports = Editable;