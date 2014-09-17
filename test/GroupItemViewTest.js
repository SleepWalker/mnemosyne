var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var GroupItemView = require('../src/js/views/GroupItemView');

describe('GroupView', function() {
    var view, model;

    beforeEach(function() {
        model = new Backbone.Model({
            id: 1,
            name: 'test'
        });
        model.id = model.get('id');

        view = new GroupItemView({
            model: model,
        });

        view.render();
    });

    describe('CRUD item', function() {
        it('should be editable', function() {
            var $edit = view.$el.hasClass('js-edit') ? view.$el : view.$('.js-edit');
            var initialChildrenLength = view.$el.children().length;

            $edit.click();

            assert.operator(
                $edit.length, '>', 0,
                'Expecting .js-edit element'
                );
            assert.operator(
                view.$el.children().length, '>', initialChildrenLength,
                'There should be new children after click'
                );
        });

        it('should update itself on model change', function() {
            var expected = '{{__newname__}}';
            view.model.set('name', expected);

            assert.include(view.$el.text(), expected);
        });

        it('should be deletable', function() {
            view.model.destroy = sinon.spy();

            view.$('.js-destroy').click();

            assert.ok(
                view.$('.js-destroy').length > 0,
                'js-destroy element not found'
                );

            assert.ok(view.model.destroy.calledOnce);
        });

        it('should remove itself on model destroy', function() {
            var $test = Backbone.$('<div>');
            $test.append(view.$el);

            view.model.destroy();

            assert.ok(view.$el.parent().length === 0);
        });
    });

    // Thist tests are also integration tests with GroupListView
    describe('#setGroupCriterium()', function() {
        var view;
        var GroupList = require('../src/js/views/GroupList');
        var collection = require('../src/js/collections/GroupCollection');
        var contactCollection = require('../src/js/collections/ContactCollection');

        beforeEach(function() {
            view = new GroupList();
            view.render();

            sinon.stub(contactCollection, 'setGroupCriterium');

            collection.add([
              {name: "Flying Dutchman", id: 'my group'},
              {name: "Black Pearl"}
            ]);
        });

        afterEach(function() {
            collection.reset();
            contactCollection.setGroupCriterium.restore();
        });

        it('should apply criterium when the children clicked', function() {
            var $el = view.$('li').eq(1);

            $el.click();

            assert.ok(contactCollection.setGroupCriterium.calledWith(
                collection.at(0).id
                ));
        });

        it('should disable criterium when the first child clicked', function() {
            var $el = view.$('li').eq(0);

            $el.click();
            assert.ok(
                contactCollection.setGroupCriterium.calledWith(null)
                );
        });
    });
});