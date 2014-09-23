var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var PersonCardForm = require('../src/js/views/PersonCardForm');
var collection = require('../src/js/collections/PersonCollection');


describe('PersonCardForm (itegration test with PersonCardView)', function(){
    var view, model;
    beforeEach(function() {
        model = {
            id: '123',
            name: 'Vasia',
            surname: 'Pupkin',
            birthday: '11.11.1111',
            organization: 'Hello World',
            position: 'SEO'
        };

        view = new PersonCardForm();
    });

    afterEach(function() {
        collection.reset();
    });

    describe('#setModel() and #getModel()', function() {
        it('the `model` should be private property', function() {
            assert.isUndefined(view.model);
        });

        it('should accept model in constructor', function() {
            view = new PersonCardForm({
                model: model,
            });

            assert.equal(view.getModel().get('surname'), model.surname);
        });

        it('should accept plain object as model', function() {
            view.setModel(model);

            assert.equal(view.getModel().get('surname'), model.surname);
        });

        it('should accept model instance', function() {
            collection.add(model);
            model = collection.at(0);

            view.setModel(model);

            assert.deepEqual(
                view.getModel().pick('id', 'surname'),
                model.pick('id', 'surname')
                );
        });
    });

    describe('form interaction', function() {
        beforeEach(function() {
            view = new PersonCardForm({
                model: model,
            });
            collection.add(model);

            view.render();
        });

        it('should populate form with model attributes', function() {
            assert.equal(view.$('[name=surname]').val(), model.surname);
        });

        it('should create new model and clear form, when is no `model` set', function() {
            view.setModel(null);

            assert.equal(view.$('[name=surname]').val(), '');
        });

        it('should populate model with values from the form', function() {
            var expected = 'mnemosyne';
            view.$('[name=name]').val(expected);

            var result = view.populateModel();

            assert.ok(result);
            assert.equal(view.getModel().get('name'), expected);
        });

        it('should not populate, when model is not valid', function() {
            var expected = 'mnemosyne';
            view.$('[name=name]').val(expected);
            view.getModel().isValid = sinon.stub().returns(false);

            var result = view.populateModel();

            assert.notOk(result);
            assert.notEqual(view.getModel().get('name'), expected);
        });

        it('should save model on form submit', function() {
            view.getModel().save = sinon.spy();

            view.$('form').submit();

            assert.ok(view.getModel().save.calledOnce);
        });

        it('should populate model on submit', function() {
            view.populateModel = sinon.spy();

            view.$('form').submit();

            assert.ok(view.populateModel.calledOnce);
        });

        it('should add model into collection when it is new one', function() {
            view.setModel(null);
            var newModel = view.getModel();
            newModel.set('name', 'test');
            newModel.save = sinon.spy();
            var expected = collection.length + 1;

            view.populateForm();
            view.saveModel();

            assert.equal(collection.length, expected);
            assert.ok(newModel.save.calledOnce);
        });

        it('should remove itself after save, when BaseFormView.removeOnSave == true', function() {
            view.removeOnSave = true;
            Backbone.$('body').append(view.$el);

            view.saveModel();

            assert.ok(view.$el.parent().length === 0);
        });

        it('should destroy model on js-destroy click', function() {
            view.getModel().destroy = sinon.spy();

            view.$('.js-destroy').click();

            assert.ok(view.getModel().destroy.calledOnce);
        });
    });
});