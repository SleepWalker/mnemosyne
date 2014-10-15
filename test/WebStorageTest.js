var assert = require('chai').assert;

var WebStorage = require('../src/js/persistance/WebStorage');
var Backbone = require('backbone');

describe('WebStorage', function() {
    var ws, model;

    beforeEach(function() {
        localStorage.clear();
        ws = new WebStorage();

        model = new Backbone.Model();

        model.collection = {url: 'test'};
    });

    describe('Instantiate', function() {
        it('should return storage instance', function() {
            assert.ok(new WebStorage());
        });
    });

    describe('#getStorageName()', function(){
        it('should have default storageName', function() {
            assert.ok(ws.getStorageName());
        });

        it('constructor should accept the name of the storage', function() {
            ws = new WebStorage('test');

            assert.equal(ws.getStorageName(), 'test');
        });
    });

    describe('#create()', function() {
        it('should create model id', function() {
            assert.ok(model.isNew());

            ws.create(model);

            assert.notOk(model.isNew(), 'The model should be not new and have id');
        });

        it('should preserve id, if it already specified', function() {
            model.set(model.idAttribute, 'test');

            ws.create(model);

            assert.equal(model.id, 'test');
        });

        it('should be saved in storage', function() {
            model.set('something', 'else');

            var actual = ws.create(model);

            assertModelExist(model);
            assert.deepEqual(actual, model.toJSON());
        });
    });

    describe('#update()', function() {
        it('should be updated', function() {
            ws.create(model);

            model.set('something', 'else');

            var actual = ws.update(model);

            assertModelExist(model);
            assert.deepEqual(actual, model.toJSON());
        });
    });

    describe('#destroy()', function() {
        it('should be deleted', function() {
            ws.create(model);

            var actual = ws.destroy(model);
            
            assertModelNotExist(model);
            assert.deepEqual(actual, model.toJSON());
        });
    });

    describe('#find()', function() {
        it('should return model by guid', function() {
            ws.create(model);

            var actualModel = ws.find(model.id);

            assert.deepEqual(actualModel, model.toJSON());
        });

        it('should find model after storage reopening', function() {
            ws.create(model);

            ws = new WebStorage();

            assert.ok(ws.find(model.id));
        });

        it('throws exception, when wrong id', function() {
            assert.throws(function() {
                ws.find('mnemosyne');
            });
        });
    });

    describe('#findAll()', function() {
        it('should throw an error, when no url', function() {
            assert.throws(function() {
                ws.findAll({});
            }, 'A "url" property or function must be specified');
        });

        it('should return all models taking url into account', function() {
            var Model1 = Backbone.Model.extend({
                collection: {url: 'foo'}
            });
            var model1 = new Model1();
            ws.create(model1);
            var Model2 = Backbone.Model.extend({
                collection: {url: 'bar'}
            });
            var model2 = new Model2();
            ws.create(model2);
            var model3 = new Model2();
            ws.create(model3);

            var models = ws.findAll({url: 'bar'});

            var expected = [model2.toJSON(), model3.toJSON()];
            assert.deepEqual(models, expected);
        });
    });

    describe('auto trim of id separators in index', function() {
        var model1, model2;
        beforeEach(function() {
            localStorage.clear();
            ws = new WebStorage();

            model1 = new Backbone.Model();
            model1.collection = {url: 'test'};
            ws.create(model1);

            model2 = new Backbone.Model();
            model2.collection = {url: 'test'};
            ws.create(model2);
        });

        it('should trim start', function() {
            ws.destroy(model1);
            var index = getIndex(model1);

            assert.notEqual(index.slice(0, 1), '|');
        });

        it('should trim end', function() {
            ws.destroy(model2);
            var index = getIndex(model2);

            assert.notEqual(index.slice(-1), '|');
        });
    });

    function assertModelExist(model)
    {
        var index = getIndex(model);
        var modelJSON = getModelJSON(model);

        assert.equal(index, model.id);
        assert.deepEqual(modelJSON, model.toJSON());
    }

    function assertModelNotExist(model)
    {
        var index = getIndex(model);
        var modelJSON = getModelJSON(model);

        assert.notEqual(index, model.id);
        assert.equal(modelJSON, null);
    }

    function getIndex(model)
    {
        return localStorage.getItem(ws.getStorageName() + '-' + model.collection.url);
    }

    function getModelJSON(model)
    {
        return JSON.parse(localStorage.getItem(ws.getStorageName() + '-' + model.id));
    }
});
