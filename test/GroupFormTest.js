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
            model: model,
        });
    });

    afterEach(function() {
        collection.reset();
    });

    it('should be submitable', function() {
        view.render();
        assert.ok(view.$('button[type=submit]').length > 0);
    });

    it('should be deletable', function() {
        view.render();
        assert.ok(view.$('.js-destroy').length > 0);
    });
});