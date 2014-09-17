/**
 * This view supposes, that container has display: flex;
 */

var Backbone = require('backbone');

var ContactCardView = Backbone.View.extend({
    tagName: 'div',
    className: 'user-card js-edit',

    formView: require('./ContactCardForm'),
    template: require('./tpl/contact-card.handlebars'),

    initialize: function(options)
    {
        this.model = options.model;

        this.listenTo(this.model, "change", this.render);
        if(this.model.collection) {
            this.listenTo(this.model.collection, "add", this.updateOrder);
            this.listenTo(this.model.collection, "search", this.applyCriterium);
        }
    },

    render: function()
    {
        var collection = this.model.collection;
        this.$el.html(this.template(this.model.toJSON()));

        this.updateOrder();

        return this;
    },

    updateOrder: function() {
        // sorting using flex
        var collection = this.model.collection;
        var orderIndex = collection ? collection.indexOf(this.model) : 0;
        this.setOrder(++orderIndex);
    },

    setOrder: function(orderIndex) {
        orderIndex += '';

        this.$el.css({
            'order': orderIndex,
            '-webkit-box-ordinal-group': orderIndex,
            '-moz-box-ordinal-group': orderIndex,
            '-ms-flex-order': orderIndex,
            '-webkit-order': orderIndex
        });
    },

    hide: function() {
        this.$el.addClass('hidden');
    },

    show: function() {
        this.$el.removeClass('hidden');
    },

    applyCriterium: function(criterium) {
        var show = this.isGroupCriteriumApplies(criterium) &&
            this.isTextCriteriumApplies(criterium);

        this[show ? 'show' : 'hide']();
    },

    isGroupCriteriumApplies: function(criterium) {
        if(criterium.groupId === null) {
            return true;
        }
        
        return criterium.groupId == this.model.get('groupId');
    },

    isTextCriteriumApplies: function(criterium) {
        if(criterium.text === null) {
            return true;
        }

        var text = criterium.text;
        var word = /\w+/g;
        var matched = text.match(word);
        // TODO: probably better to use .omit()
        var attributes = this.model.toJSON();

        for(var i = 0; i < matched.length; i++) {
            if(matchesModelAttributes(matched[i], attributes)) {
                return true;
            }
        }
        
        return false;
    }
});

function matchesModelAttributes(str, attributes) {
    for(var i in attributes) {
        if(attributes[i].indexOf && attributes[i].indexOf(str) > -1) {
            return true;
        }
    }

    return false;
}

module.exports = ContactCardView;

// mixing in some basic behavior
require('backbone.cocktail').mixin(module.exports,
    require('../mixins/Deletable'),
    require('../mixins/Editable')
    );
