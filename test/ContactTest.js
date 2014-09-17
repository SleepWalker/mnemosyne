var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Contact = require('../src/js/models/Contact');
// we require a view to handle user input
var ContactCardForm = require('../src/js/views/ContactCardForm');

describe('Contact', function() {
    var model, view;

    beforeEach(function() {
        model = new Backbone.Model({
            id: '123',
            name: 'Vasia',
            surname: 'Pupkin',
            birthday: '11.11.1111',
            organization: 'Hello World',
            position: 'SEO'
        });

        view = new ContactCardForm({
            model: model
        });

        view.render();
    });

    afterEach(function() {
        view.collection.reset();
    });

    describe('Validation', function() {
        it('should require name', function() {
            var expected = view.collection.length;
            view.$('[name=name]').val('');
            view.render = sinon.spy();

            view.$('form').submit();

            assert.notOk(model.isValid());
            assert.equal(view.collection.length, expected);
        });
        
        it('should not pass with `group` setted, when there is no `groupId`', function() {
            
        });
    });
});
