var assert = require('chai').assert;
var sinon = require('sinon');

var Backbone = require('backbone');
var GroupAddAction = require('../src/js/views/GroupAddAction');

Backbone.$ = require('jquery');

describe('GroupAddAction', function(){
    var view;

    beforeEach(function() {
        view = new GroupAddAction({
        });

        view.render();
    });

    afterEach(function() {
        view.remove();
    });

    // TODO: this part is same to GroupItemView
    it('should be editable', function() {
        var $edit = view.$el.hasClass('js-edit') ? view.$el : view.$('.js-edit');
        var initialChildrenLength = view.$el.children().length;

        $edit.click();

        assert.operator(
            $edit.length, '>', 0,
            'Expecting .js-edit element'
            );
        assert.operator(
            view.$el.children().length, '>', initialChildrenLength,
            'There should be new children after click'
            );
    });
});