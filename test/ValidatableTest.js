var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
var Validatable = require('../src/js/mixins/Validatable');
var Cocktail = require('backbone.cocktail');
Backbone.$ = require('jquery');

var View = Backbone.View.extend({
    initialize: function() {
        this.$el.html(
            '<form id="demo-form" data-parsley-validate>' +
            '<div><input type="text" name="fullname" required /></div>' +
            '</form>');
    }
});
Cocktail.mixin(View, Validatable);

describe('Validatable', function() {
    var view, model;

    beforeEach(function() {
        view = new View({
            model: new Backbone.Model()
        });

        view.render();

        Backbone.$('body').append(view.$el);
    });

    afterEach(function() {
        view.remove();
    });

    it('should throw, when form has attribute `data-parsley-validate`', function() {
        assert.throws(function() {
            view.$('form').attr('data-parsley-validate', 'true');
            view.render();
        }, /data\-parsley\-validate/);
    });

    it('should overwrite default models validate() method', function() {
        assert.isFunction(view.model.validate);
    });

    it('should return something from validate() method, when error ocures', function() {
        assert.ok(view.model.validate());
    });

    it('should apply error class', function() {
        view.model.validate();
        assert.ok(view.$('input').parent().hasClass('error'));
    });
});
