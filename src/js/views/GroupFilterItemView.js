var Backbone = require('backbone');

var personCollection = require('../collections/PersonCollection');
var GroupItemView = require('./GroupItemView');

var GroupFilterItemView = GroupItemView.extend({
    formView: require('./GroupForm'),
    template: require('./tpl/group-item.handlebars'),

    events: {
        'click': 'setCriterium',
    },

    setCriterium: function(event) {
        var id = this.model.id ? this.model.id : null;

        if(!id && Backbone.$(event.target).closest('.js-no-group').length) {
            id = '';
        }
        
        personCollection.setGroupCriterium(id);
    },
});

module.exports = GroupFilterItemView;

// mixing in some basic behavior
require('backbone.cocktail').mixin(module.exports,
    require('../mixins/Deletable'),
    require('../mixins/Editable')
    );