var Backbone = require('backbone');
var Validatable = require('../mixins/Validatable');
var _ = require('underscore');

// TODO: it can be mixin, probably

var viewConstructor = function() {
    var model; // the model should be private

    this.getModel = function() {
        return model;
    };

    this.hasModel = function() {
        return !!model;
    };

    this.setModel = function(m, doNotPopulate) {
        var oldModel = model;

        if(!(m instanceof Backbone.Model)) {
            model = this.collection.get(m);

            if(!model) {
                model = new this.collection.model(m);
            }
        } else {
            model = m;
        }

        if(doNotPopulate) {
            return;
        }

        this.populateForm();
    };

    Backbone.View.apply(this, arguments);
};

var BaseFormView = Backbone.View.extend({
    constructor: viewConstructor,
    
    tagName: 'div',
    inputSelector: 'input,textarea,select',
    removeOnSave: false,

    events: {
        'submit form': 'saveModel',
        'click .js-destroy': 'destroyModel',
    },

    initialize: function(options)
    {
        options = options || {};

        this.removeOnSave = options.removeOnSave || this.removeOnSave;

        _.extend(this, _.omit(Validatable, 'render'));

        // this time we do not need auto asign of model property
        delete this.model;

        this.setModel(options.model, true);
    },

    render: function()
    {
        this.wrapInForm(this.template())
            .appendTo(this.$el)
            ;

        if(this.hasModel()) {
            this.populateForm();
        }

        return this;
    },

    wrapInForm: function(html) {
        this.$form = Backbone.$('<form>');

        this.$form.append(Backbone.$(html));

        return this.$form;
    },

    populateForm: function() {
        var attributes = this.hasModel() ? this.getModel().toJSON() : {};

        this.inputs().each(function() {
            if(attributes[this.name]) {
                Backbone.$(this).val(attributes[this.name]);
            } else {
                Backbone.$(this).val('');
            }
        });
    },

    inputs: function() {
        var $form = this.$form;

        return this.$(this.inputSelector).filter(function() {
            return Backbone.$(this).parents('form')[0] === $form[0];
        });
    },

    populateModel: function() {
        var model = this.getModel();

        this.patchModel(this.getModel());

        if(!model.isValid()) {
            return false;
        }

        var formFields = this.inputs().serializeArray();
        Backbone.$.each(formFields, function(index, field) {
            model.set(field.name, field.value);
        });

        return true;
    },

    saveModel: function(e) {
        if(e) {
            e.preventDefault();
        }

        if(!this.populateModel()) {
            return;
        }

        var saveOptions = {};
        if(this.removeOnSave) {
            saveOptions = {
                success: Backbone.$.proxy(this.remove, this),
            };
        }

        if(this.beforeSave()) {
            if(!this.getModel().collection) {
                this.collection.create(this.getModel(), saveOptions);
            } else {
                this.getModel().save(null, saveOptions);
            }

            this.afterSave();
        }
    },

    beforeSave: function() {return true;},
    afterSave: _.noop,

    destroyModel: function(event) {
        event.stopPropagation();
        event.preventDefault();

        var saveOptions = {};
        if(this.removeOnSave) {
            saveOptions = {
                success: Backbone.$.proxy(this.remove, this),
            };
        }

        this.getModel().destroy(saveOptions);
    }
});

module.exports = BaseFormView;