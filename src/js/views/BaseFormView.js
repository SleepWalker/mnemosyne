var Backbone = require('backbone');
var Validatable = require('../mixins/Validatable');


// the model should be private
var viewConstructor = function() {
    var model;

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
    className: 'contacts-form',
    inputSelector: 'input,textarea,select',
    removeOnSave: false,

    events: {
        'submit form': 'saveModel',
        'click .js-destroy': 'deleteModel'
    },

    initialize: function(options)
    {
        options = options || {};

        this.removeOnSave = options.removeOnSave || this.removeOnSave;

        // this time we do not need auto asign of model property
        delete this.model;

        this.setModel(options.model, true);
    },

    render: function()
    {
        this.$el.html('<form>'+this.template()+'</form>');

        if(this.hasModel()) {
            this.populateForm();
        }

        return this;
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
        return this.$(this.inputSelector);
    },

    populateModel: function() {
        var model = this.getModel();

        Validatable.patchModel(model, this.$('form'));
        // we should not change model, if the form filled with errors
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

        if(!this.getModel().collection) {
            this.collection.create(this.getModel(), saveOptions);
        } else {
            this.getModel().save(null, saveOptions);
        }
    },

    deleteModel: function() {
        this.getModel().destroy();
    }
});

module.exports = BaseFormView;