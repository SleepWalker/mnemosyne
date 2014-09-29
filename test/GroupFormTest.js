var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var GroupForm = require('../src/js/views/GroupForm');
var collection = require('../src/js/collections/GroupCollection');

// Here is only basic tests, because we are
// reusing functionality of BaseFormView
describe('GroupForm', function(){
    var view, model;
    beforeEach(function() {
        model = {
            id: '123',
            name: 'My Group',
        };
        collection.add(model);

        view = new GroupForm({
            model: collection.at(0),
        });
    });

    afterEach(function() {
        collection.reset();
        view.remove();
    });

    it('should have form', function() {
        view.render();
        assert.ok(view.$('form').length > 0);
    });

    it('should be submitable', function() {
        view.render();

        assert.ok(view.$('[type=submit]').length > 0);
    });

    it('should save the model on submit', function() {
        view.getModel().save = sinon.spy();
        view.render();
        Backbone.$('body').append(view.$el);

        view.$('[type=submit]').click();

        assert.ok(view.getModel().save.called);
    });

    it('should be deletable', function() {
        view.render();
        Backbone.$('body').append(view.$el);
        
        view.$('.js-destroy').click();
        
        assert.equal(collection.length, 0,
            'Model should be destroyed'
            );
    });
});
