var Backbone = require('backbone');

var personCollection = require('../collections/PersonCollection');
var GroupItemView = require('./GroupItemView');

var GroupFilterItemView = GroupItemView.extend({
    formView: require('./GroupForm'),
    template: require('./tpl/group-item.handlebars'),

    events: {
        'click': 'setCriterium',
    },

    setCriterium: function() {
        var id = this.model.id ? this.model.id : null;
        personCollection.setGroupCriterium(id);
    },
});

module.exports = GroupFilterItemView;

// mixing in some basic behavior
require('backbone.cocktail').mixin(module.exports,
    require('../mixins/Deletable'),
    require('../mixins/Editable')
    );