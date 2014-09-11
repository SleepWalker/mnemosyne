var assert = require('chai').assert;
var sinon = require('sinon');

var Storage = require('../src/js/persistance/Storage');
var Backbone = require('backbone');

describe('Storage', function(){

    describe('#setStorage()', function() {
        it('should inject specified storage in Backbone.sync', function() {
            var initial = Backbone.sync;

            Storage.setStorage({});

            assert.notEqual(Backbone.sync, initial);
        });
    });

    describe('#sync()', function() {
        var storage;
        beforeEach(function() {
            storage = {
                find: sinon.spy(),
                findAll: sinon.spy(),
                create: sinon.spy(),
                update: sinon.spy(),
                destroy: sinon.spy()
            };


            Storage.setStorage(storage);
        });
        
        it('throws on unexisted operation', function() {
            assert.throws(function() {
                Backbone.sync('google', {});
            });
        });

        it('should read by id with find()', function() {
            var id = '123';

            Backbone.sync('read', {id: id});

            assert.ok(storage.find.called);
            assert.ok(storage.find.calledWith(id));
        });

        it('should read all with findAll()', function() {
            Backbone.sync('read', {});

            assert.ok(storage.findAll.called);
        });

        it('should create new model with create()', function() {
            var model = {id: '123'};
            Backbone.sync('create', model);

            assert.ok(storage.create.called);
            assert.ok(storage.create.calledWith(model));
        });

        it('should update existing model with update()', function() {
            var model = {id: '123'};
            Backbone.sync('update', model);

            assert.ok(storage.update.called);
            assert.ok(storage.update.calledWith(model));
        });

        it('should delete existing model with destroy()', function() {
            var model = {id: '123'};
            Backbone.sync('delete', model);

            assert.ok(storage.destroy.called);
            assert.ok(storage.destroy.calledWith(model));
        });

        it('should call success callbac if everything ok', function() {
            var callback = sinon.spy();
            Backbone.sync('read', {}, {
                success: callback
            });

            assert.ok(callback.called);
        });

        it('should call success callback if everything ok', function() {
            var callback = sinon.spy();
            storage.findAll = function() {
                throw new Error('error');
            };

            Backbone.sync('read', {}, {
                error: callback
            });

            assert.ok(callback.called);
        });
    });
});