var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var PersonCardView = require('../src/js/views/PersonCardView');

describe('PersonCardView', function(){
    var model, view;
    describe('render', function() {
        beforeEach(function() {
            model = new Backbone.Model({
                id: '123',
                name: 'Vasia',
                surname: 'Pupkin',
                birthday: '11.11.1111',
                organization: 'Hello World',
                position: 'SEO'
            });

            view = new PersonCardView({
                model: model
            });

            view.render();
        });

        afterEach(function() {
            view.remove();
            model.destroy();
        });

        it('should create el', function() {
            var text = view.$el.text();

            assert.include(text, model.get('name'));
            assert.include(text, model.get('surname'));
        });

        it('should respond to model changes', function() {
            var expected = 'newname2014';

            model.set('name', expected);

            var text = view.$el.text();
            assert.include(text, expected);
        });

        it('should remove itself on model destroy', function() {
            Backbone.$('body').append(view.$el);

            model.destroy();

            assert.equal(view.$el.parent().length, 0);
        });

        // TODO: this part is same to GroupItemView
        it('should be deletable', function() {
            view.model.destroy = sinon.spy();

            view.$('.js-destroy').click();

            assert.ok(
                view.$('.js-destroy').length > 0,
                'js-destroy element not found'
                );

            assert.ok(view.model.destroy.calledOnce);
        });

        // TODO: this part is same to GroupItemView
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

        it('should add class .hidden, when hide() called', function() {
            view.hide();

            assert.ok(view.$el.hasClass('hidden'));
        });

        it('should remove class .hidden, when show() called', function() {
            view.$el.addClass('hidden');
            view.show();

            assert.notOk(view.$el.hasClass('hidden'));
        });

        it('should self sorting the list using flex order', function() {
            var index = 5;
            view.model.collection = {
                indexOf: sinon.stub().returns(index)
            };

            view.render();

            // checking only one, non prefixed order property
            var expected = index + 1 + '';
            assertStyleIfBrowserSupports(view.el,
                'order', expected,
                'style should contain "order..."'
                );
            assertStyleIfBrowserSupports(view.el,
                'webkitBoxOrdinalGroup', expected,
                'style should contain "-webkit-box-ordinal-group..."'
                );
            assertStyleIfBrowserSupports(view.el,
                'MozBoxOrdinalGroup', expected,
                'style should contain "-moz-box-ordinal-group..."'
                );
            assertStyleIfBrowserSupports(view.el,
                'msFlexOrder', expected,
                'style should contain "-ms-flex-order..."'
                );
            assertStyleIfBrowserSupports(view.el,
                'WebkitOrder', expected,
                'style should contain "-webkit-order..."'
                );
        });

        function assertStyleIfBrowserSupports(el, styleProp, expected, message) {
            if(styleProp in el.style) {
                assert.equal(el.style[styleProp], expected, message);
            }
        }
    });

    describe('#applyCriterium()', function() {
        var collection = require('../src/js/collections/PersonCollection');
        beforeEach(function() {
            model = new collection.model(model.toJSON());

            collection.add(model);

            view = new PersonCardView({
                model: model
            });

            view.render();

            view.hide = sinon.spy();
            view.show = sinon.spy();
        });

        afterEach(function() {
            collection.reset();
        });

        it('should be called on search event', function() {
            collection.setGroupCriterium(null);

            // we can't stub applyCriterium() beacause it is 
            // already bond to collection
            assert.ok(view.hide.called || view.show.called);
        });

        it('should call show(), when both criteriums true', function() {
            view.isGroupCriteriumApplies = sinon.stub().returns(true);
            view.isTextCriteriumApplies = sinon.stub().returns(true);

            view.applyCriterium();
            
            assert.ok(view.show.called);
        });

        it('should call hide(), when both criteriums false', function() {
            view.isGroupCriteriumApplies = sinon.stub().returns(false);
            view.isTextCriteriumApplies = sinon.stub().returns(false);

            view.applyCriterium();
            
            assert.ok(view.hide.called);
        });

        it('should call hide(), when one criterium false', function() {
            view.isGroupCriteriumApplies = sinon.stub().returns(false);
            view.isTextCriteriumApplies = sinon.stub().returns(true);

            view.applyCriterium();
            
            assert.ok(view.hide.called);

            view.hide = sinon.spy();
            view.isGroupCriteriumApplies = sinon.stub().returns(true);
            view.isTextCriteriumApplies = sinon.stub().returns(false);

            view.applyCriterium();
            
            assert.ok(view.hide.called);
        });

        describe('#isGroupCriteriumApplies()', function() {
            it('should apply when no filter', function() {
                var result = view.isGroupCriteriumApplies({groupId: null});

                assert.ok(result);
            });

            it('should not apply when wrong filter', function() {
                var result = view.isGroupCriteriumApplies({groupId: 'wrongGroup'});

                assert.notOk(result);
            });

            it('should apply filter', function() {
                var expected = 'trueGroup';
                model.set('groupId', expected);
                
                var result = view.isGroupCriteriumApplies({groupId: expected});

                assert.ok(result);
            });

            it('should apply filter for `no group` persons', function() {
                var expected = '';
                model.set('groupId', expected);
                
                var result = view.isGroupCriteriumApplies({groupId: expected});
                assert.ok(result);

                model.set('groupId', 'hasGroup');
                
                result = view.isGroupCriteriumApplies({groupId: expected});
                assert.notOk(result);

            });
        });

        describe('#isTextCriteriumApplies()', function() {
            it('should apply when no filter', function() {
                var result = view.isTextCriteriumApplies({text: null});

                assert.ok(result);
            });

            it('should not apply when wrong filter', function() {
                var result = view.isTextCriteriumApplies({text: 'not_exists'});

                assert.notOk(result);
            });

            it('should search all the attributes', function() {
                // The name and surname must be tested
                var result;
                
                result = view.isTextCriteriumApplies({text: 'Vasia'});

                assert.ok(result);
                
                result = view.isTextCriteriumApplies({text: 'Pupkin'});

                assert.ok(result);
            });
        });
    });
});