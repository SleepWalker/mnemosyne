var assert = require('chai').assert;
var sinon = require('sinon');

var $ = require('jquery');
var Composer = require('../src/js/dom/DOMComposer');

describe('DOMComposer', function() {
    var stubView;
    var regions;

    beforeEach(function() {
        stubView = function(data)
        {
            if(!stubView.called) {
                stubView.called = 0;
            }
            var Obj = function() {};
            Obj.prototype.render = function() {stubView.called++;};
            Obj.prototype.$el = data;

            return Obj;
        };
        regions = ['#DOMComposer_test1', '#DOMComposer_test2'];

        $('body').append('<div id="'+regions[0].slice(1)+'" />');
        $('body').append('<div id="'+regions[1].slice(1)+'" />');
    });

    afterEach(function() {
        $(regions.join(',')).remove();
    });

    it('should fill regions with specified views', function() {
        var composer = Composer({
            regions: {
                '#DOMComposer_test1': stubView('test1'),
                '#DOMComposer_test2': stubView('test2'),
            }
        });

        composer.compose();

        assert.equal(stubView.called, 2);
        assert.equal($(regions[0]).html(), 'test1');
        assert.equal($(regions[1]).html(), 'test2');
    });

    it('should render arrays of views', function() {
        var composer = Composer({
            regions: {
                '#DOMComposer_test1': [stubView('test1'), stubView('test2')],
            }
        });

        composer.compose();

        assert.equal(stubView.called, 2);
        assert.equal($(regions[0]).html(), 'test1test2');
    });
});