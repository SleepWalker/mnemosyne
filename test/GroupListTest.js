var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
Backbone.$ = require('jquery');

var GroupList = require('../src/js/views/GroupList');
var collection = require('../src/js/collections/GroupCollection');
var contactCollection = require('../src/js/collections/ContactCollection');

describe('GroupList', function() {
    var view;
    beforeEach(function() {
        view = new GroupList();
        view.render();
    });

    afterEach(function() {
        collection.reset();
    });

    it('should update itself when collection updated', function() {
        collection.add([
          {name: "Flying Dutchman"},
          {name: "Black Pearl"}
        ]);

        assert.operator(view.$el.children().length, '>', 1);
    });

    it('should switch active class', function() {
        collection.add([
          {name: "Flying Dutchman"},
          {name: "Black Pearl"}
        ]);
        assert.ok(
            view.$('li').eq(0).hasClass('active'),
            'By default first item active'
            );

        view.$('li').eq(1).click();

        assert.equal(
            view.$('.active').length, 1,
            'It should be only one active item after click'
            );
        assert.ok(
            view.$('li').eq(1).hasClass('active'),
            'The clicked item should be .active'
            );
    });

    it('should switch active class when the children clicked', function() {
        collection.add([
          {name: "Flying Dutchman"},
          {name: "Black Pearl"}
        ]);

        var $el = view.$('li').eq(1);

        $el.children().click();

        assert.ok($el.hasClass('active'));
    });
});