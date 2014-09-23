var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var GroupItemView = require('../src/js/views/GroupFilterItemView');

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
        var GroupFilterList = require('../src/js/views/GroupFilterList');
        var collection = require('../src/js/collections/GroupCollection');
        var personCollection = require('../src/js/collections/PersonCollection');

        beforeEach(function() {
            sinon.stub(personCollection, 'setGroupCriterium');
            
            view = new GroupFilterList();
            view.render();

            collection.add([
              {name: "Black Pearl"},
              {name: "Flying Dutchman", id: 'my group'}
            ]);
        });

        afterEach(function() {
            collection.reset();
            personCollection.setGroupCriterium.restore();
        });

        it('should apply criterium when the children clicked', function() {
            var $el = view.$('li').last();

            $el.click();

            assert.ok(personCollection.setGroupCriterium.calledWith(
                collection.last().id
                ));
        });

        it('should disable criterium when the first child clicked', function() {
            var $el = view.$('li').eq(0);

            $el.click();
            assert.ok(
                personCollection.setGroupCriterium.calledWith(null)
                );
        });
    });
});