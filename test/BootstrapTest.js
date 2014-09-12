var assert = require('chai').assert;
var sinon = require('sinon');

var App = require('../src/js/App.js');

describe('App', function(){
    it('#run() should not exist before configure', function() {
        assert.ok(!App.run);
    });

    var storage = {open: sinon.spy()};
    var composer = {compose: sinon.spy()};

    it('should expect storage and composer', function() {
        var params = {
            components: {},
        };
        assert.throw(function() {
            App.configure(params);
        });

        params.components.storage = storage;
        assert.throw(function() {
            App.configure(params);
        });

        params.components.composer = composer;
        assert.doesNotThrow(function() {
            App.configure(params);
        });

        assert.throw(function() { // we don't let to configure the second time
            App.configure(params);
        });
    });

    it('should hasComponent()', function() {
        assert.ok(App.hasComponent('storage'));
    });

    it('should getComponent()', function() {
        assert.deepEqual(App.getComponent('storage'), storage);
    });

    it('should setComponent()', function() {
        App.setComponent('test', {});

        assert.ok(App.hasComponent('test'));
    });

    describe('#run', function(){
        it('should open storage and compose', function() {
            App.run();

            assert.notOk(storage.open.called);
            assert.ok(composer.compose.called);
        });

        it('should throw when runned more than once', function() {
            assert.throws(function() {
                App.run();
            });
        });
    });
});