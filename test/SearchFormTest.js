var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var SearchForm = require('../src/js/views/SearchForm');
var collection = require('../src/js/collections/ContactCollection');

describe('SearchForm', function() {
    var view;

    beforeEach(function() {
        view = new SearchForm();
        view.render();
    });

    describe('#setTextCriterium()', function() {
        var restoreTextCriterium =  collection.setTextCriterium;
        beforeEach(function() {
            collection.setTextCriterium = sinon.stub();
        });

        afterEach(function() {
            collection.setTextCriterium = restoreTextCriterium;
        });

        it('should apply criterium on text input', function() {
            var $el = view.$('input[type=text]').eq(0);
            var expected = 'something';

            $el.val(expected).change();

            assert.ok(collection.setTextCriterium.calledWith(
                expected
                ));
        });

        it('should disable criterium when the first child clicked', function() {
            var $el = view.$('input[type=text]').eq(0);
            var expected = null;

            $el.val('').change();

            assert.ok(collection.setTextCriterium.calledWith(
                expected
                ));
        });
    });
});