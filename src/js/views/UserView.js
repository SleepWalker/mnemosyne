var Backbone = require('backbone');
var Validatable = require('../mixins/Validatable');
var _ = require('underscore');

var Storage = require('../persistance/Storage');
var WebStorage = require('../persistance/WebStorage');
var App = require('../App');

var UserView = Backbone.View.extend({
    className: 'user has-form',
    tagName: 'li',

    events: {
        'click .js-change-storage': 'changeStorage',
        'focus input': 'makeActive',
        'blur input': 'makeInactive'
    },

    formView: require('./PersonCardForm'),
    template: require('./tpl/user-view.handlebars'),

    initialize: function() {
        _.extend(this, _.omit(Validatable, 'render', 'patchModel'));
    },

    render: function()
    {
        this.$el.html(this.template({
            storageId: Storage.getStorage().getStorageName()
        }));

        return this;
    },

    changeStorage: function(event) {
        event.preventDefault();

        if(this.formHasErrors()) {
            return;
        }

        var storageId = this.$('[name=storageId]').val();

        Storage.setStorage(new WebStorage(storageId));

        localStorage.setItem('storageId', storageId);

        App.reload();

        this.render();
    },

    makeActive: function() {
        this.$el.addClass('active');
    },

    makeInactive: function() {
        this.$el.removeClass('active');
    }
});

module.exports = UserView;