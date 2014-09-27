var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var View = require('../src/js/views/ContactManageForm');
var Collection = require('../src/js/collections/ContactCollection');

describe('ContactManageForm', function() {
    var view;
    var collection;

    beforeEach(function() {
        collection = new Collection([{
            type: 'email',
            label: 'Email',
            value: 'foo@bar.com'
        }]);
        view = new View({
            collection: collection
        });
    });

    afterEach(function() {
        view.remove();
    });
    
    it('should render field row if collection is empty', function() {
        collection = new Collection();
        view = new View({
            collection: collection
        });

        view.render();

        assert.equal(view.$('[name=label]').length, 1);
    });

    it('should render all the collection models', function() {
        view.render();

        assert.equal(view.$('[value="foo@bar.com"]').length, 1);
    });

    it('should not render empty fields, when collection is not empty', function() {
        view.render();

        assert.equal(view.$('[name="value"]').length, 1);
    });

    it('should render fields row on model creation', function() {
        view.render();

        collection.add({});

        assert.equal(view.$('[name="value"]').length, 2);
    });

    it('should create new models on dropdown click', function() {
        var contactTypeDropdown;
        contactTypeDropdown = require('../src/js/views/ContactTypeDropdownList');
        var $link = contactTypeDropdown.$('a').first();

        view.render();
        view.collection.add = sinon.spy();
        Backbone.$('body').append(view.$el);

        $link.click();

        assert.ok(view.collection.add.called);
    });

    it('should set Contact type on dropdown click', function() {
        var contactTypeDropdown;
        var typeWasSetted = false;
        contactTypeDropdown = require('../src/js/views/ContactTypeDropdownList');
        var $link = contactTypeDropdown.$('a').first();

        view.render();
        view.collection.on('add', function(model) {
            typeWasSetted = !!model.get('type');
        });
        Backbone.$('body').append(view.$el);

        $link.click();

        assert.ok(typeWasSetted);
    });
});