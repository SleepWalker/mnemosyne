var assert = require('chai').assert;
var sinon = require('sinon');

var $ = require('jquery');

describe('DOMComposer', function() {
    it('should fill regions with specified views', function() {
        var called = 0;

        var regions = ['#DOMComposer_test1', '#DOMComposer_test2'];

        $('body').append('<div id="'+regions[0].slice(1)+'" />');
        $('body').append('<div id="'+regions[1].slice(1)+'" />');

        function stubView(data)
        {
            var Obj = function() {};
            Obj.prototype.render = function() {called++;};
            Obj.prototype.$el = data;

            return Obj;
        }

        var Composer = require('../src/js/dom/DOMComposer')({
            regions: {
                '#DOMComposer_test1': stubView('test1'),
                '#DOMComposer_test2': stubView('test2'),
            }
        });

        Composer.compose();
        assert.equal(called, 2);
        assert.equal($(regions[0]).html(), 'test1');
        assert.equal($(regions[1]).html(), 'test2');
    });
});