var assert = require('chai').assert;

var WebStorage = require('../src/js/persistance/WebStorage');
var Backbone = require('backbone');

describe('WebStorage', function() {
    var ws;

    beforeEach(function() {
        localStorage.clear();
        ws = new WebStorage();
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
        var model;

        beforeEach(function() {
            model = new Backbone.Model();
        });

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
            var model = new Backbone.Model();

            ws.create(model);

            model.set('something', 'else');

            var actual = ws.update(model);

            assertModelExist(model);
            assert.deepEqual(actual, model.toJSON());
        });
    });

    describe('#destroy()', function() {
        it('should be deleted', function() {
            var model = new Backbone.Model();

            ws.create(model);

            var actual = ws.destroy(model);
            
            assertModelNotExist(model);
            assert.deepEqual(actual, model.toJSON());
        });
    });

    describe('#find()', function() {
        var model;

        beforeEach(function() {
            model = new Backbone.Model();
        });

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
        it('should return all models', function() {
            var model1 = new Backbone.Model();
            ws.create(model1);
            var model2 = new Backbone.Model();
            ws.create(model2);

            var models = ws.findAll();

            var expected = [model1.toJSON(), model2.toJSON()];
            assert.deepEqual(models, expected);
        });
    });

    function assertModelExist(model)
    {
        var index = localStorage.getItem(ws.getStorageName());
        var modelJSON = JSON.parse(localStorage.getItem(ws.getStorageName() + '-' + model.id));

        assert.equal(index, model.id);
        assert.deepEqual(modelJSON, model.toJSON());
    }

    function assertModelNotExist(model)
    {
        var index = localStorage.getItem(ws.getStorageName());
        var modelJSON = JSON.parse(localStorage.getItem(ws.getStorageName() + '-' + model.id));

        assert.notEqual(index, model.id);
        assert.equal(modelJSON, null);
    }
});