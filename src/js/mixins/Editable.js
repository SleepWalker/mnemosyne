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

        this.trigger('beforeFormRender', $target, formInstance);

        formInstance = new this.formView({
            model: this.model,
            removeOnSave: true
        });

        formInstance.render();

        this.$formRenderTarget.append(formInstance.$el);

        formInstance.$('input,textarea').eq(0).focus();

        var $button = $target.hasClass('js-edit') ? $target : this.$el;
        this.listenToTransitions($button);

        this.trigger('afterFormRender', $button, formInstance);
    };

    this.listenToTransitions = function($button) {
        var transitionEndEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
        var self = this;
        
        formInstance.$el.addClass('active');

        var initialRemove = _.bind(formInstance.remove, formInstance);
        formInstance.remove = function() {
            formInstance.$el.removeClass('active');
            self.trigger('beforeFormRemove', $button, formInstance);

            formInstance.$el.one(transitionEndEvents, function() {
                // TODO: a better way to controll multiple transitions
                setTimeout(function() {
                    initialRemove();
                    formInstance = false;
                    }, 500);
            });
        };
    };

    this.getFormInstance = function() {
        return formInstance;
    };

    this.isFormRendered = function() {
        return !!formInstance;
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