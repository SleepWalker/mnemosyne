require('../vendor/parsley'); // the version, adjusted for require

function validator($el) {
    // setup for Foundation Css Framework
    // TODO: can be separated according to DIP
    var parsley = $el.parsley({
        classHandler: function(ParsleyField) {
            return ParsleyField.$element.parent();
        },
        errorClass: 'error',
        errorsWrapper: '<small class="error"></small>',
        errorTemplate: '<span></span>'
    });
    return function() {
        var valid = parsley.validate();
        return !valid;
    };
}

module.exports = {
    patchModel: function(model, $form) {
        // Do not add data-parsley-validate to your forms
        // (C) http://parsleyjs.org/doc/index.html#psly-installation-javascript
        if($form.attr('data-parsley-validate')) {
            throw new Error('Please, do not add data-parsley-validate attribute on form');
        }

        // to anable some validation style from Foundation
        // http://foundation.zurb.com/docs/components/abide.html
        $form.attr('data-abide', '');

        model.validate = validator($form);
    },

    render: function() {
        this.patchModel(this.model, this.$('form'));
    }
};