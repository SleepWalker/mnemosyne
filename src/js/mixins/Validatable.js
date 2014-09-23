require('../vendor/parsley'); // the version, adjusted for require
var _ = require('underscore');

module.exports = {
    patchModel: function(model) {
        model = model ? model : this.model;

        model.validate = _.bind(this.formHasErrors, this);
    },

    patchForm: function() {
        var $form = this.$('form');

        // Do not add data-parsley-validate to your forms
        // (C) http://parsleyjs.org/doc/index.html#psly-installation-javascript
        if($form.attr('data-parsley-validate')) {
            throw new Error('Please, do not add data-parsley-validate attribute on form');
        }

        // to anable some validation style from Foundation
        // http://foundation.zurb.com/docs/components/abide.html
        $form.attr('data-abide', '');

        // setup for Foundation Css Framework
        this._parsley = $form.parsley({
            classHandler: function(ParsleyField) {
                return ParsleyField.$element.parent();
            },
            errorClass: 'error',
            errorsWrapper: '<small class="error"></small>',
            errorTemplate: '<span></span>'
        });
    },

    isFormPatched: function() {
        return !!this._parsley;
    },

    getValidator: function() {
        if(!this.isFormPatched()) {
            this.patchForm();
        }

        return this._parsley;
    },

    formHasErrors: function() {
        return !this.getValidator().validate();
    },

    render: function() {
        this.patchForm();
        this.patchModel();
    }
};