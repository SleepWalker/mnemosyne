var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var View = require('../src/js/views/ContactManageFormItem');
var Model = require('../src/js/models/Contact');

describe('ContactManageFormItem', function() {
    var view;
    var model;

    beforeEach(function() {
        model = new Model();

        view = new View({
            model: model
        });
    });

    afterEach(function() {
        view.remove();
    });
    
    it('should be deletable', function() {
        view.render();

        assert.equal(view.$('.js-destroy').length, 1);
    });

    it('should populate model on input change', function() {
        var expected = 'foo';
        view.render();
        Backbone.$('body').append(view.$el);

        view.$('[name=value]')
            .val(expected)
            .change()
            ;

        assert.equal(model.get('value'), expected);
    });

    it('should destroy model on js-destroy click', function() {
        model.destroy = sinon.spy();
        view.render();

        view.$('.js-destroy').click();

        assert.ok(model.destroy.called);
    });
});