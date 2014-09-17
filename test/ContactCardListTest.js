var assert = require('chai').assert;
var sinon = require('sinon');

var collection = require('../src/js/collections/ContactCollection');
var ContactCardList = require('../src/js/views/ContactCardList');

describe('ContactCardList', function() {
    var view;
    beforeEach(function() {
        view = new ContactCardList();
        view.render();
    });

    afterEach(function() {
        collection.reset();
    });
    
    it('should be empty after init', function() {
        assert.notOk(view.$el.children().length);
    });

    it('should update the list, when new model added', function() {
        view.collection.add({name: 'testname'});

        assert.equal(view.collection.length, 1);
        assert.include(view.$el.children().eq(0).text(), 'testname');
    });

    it('the views in list should be properly reordered after new models added', function() {
        view.collection.add({surname: 'test2'});
        view.collection.add({surname: 'test1'});

        assert.include(view.$el.children().eq(0).text(), 'test2');
        assert.equal(view.$el.children()[0].style.order, '2');
    });
});