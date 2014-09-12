var assert = require('chai').assert;
var sinon = require('sinon');

var $ = require('jquery');
var Backbone = require('backbone');
var ContactCard = require('../src/js/views/ContactCardView');

Backbone.$ = $;

describe('ContactCardView', function(){
    it('should create el', function() {
        var model = {
            id: '123',
            name: 'Vasia',
            surname: 'Pupkin',
            birthday: '11.11.1111',
            organization: 'Hello World',
            position: 'SEO'
        };
        
        var view = new ContactCard({
            model: new Backbone.Model(model)
        });

        var $el = view.render().$el;
        var text = $el.text();

        assert.ok(text.indexOf(model.name) > -1);
        assert.ok(text.indexOf(model.surname) > -1);
    });
});