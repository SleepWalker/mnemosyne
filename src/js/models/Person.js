var Backbone = require('backbone');

var Person = Backbone.Model.extend({
    defaults: {
        name: '',
        surname: '',
        birthday: '',
        organization: '',
        position: '',
        group: '',
        groupId: '',
        contactRelation: '',
        contacts: []
    },

    initialize: function() {
        this.ensureGroup();
    },

    ensureGroup: function() {
        if(this.isNew() || !this.get('groupId')) {
            return;
        }

        var groupCollection = require('../collections/GroupCollection');

        if(!groupCollection.get(this.get('groupId'))) {
            this.set('groupId', this.defaults.groupId);
            this.set('group', this.defaults.group);
            this.save();
        }
    },

    save: function() {
        this.ensureGroup(); // TODO: need to be tested

        return Backbone.Model.prototype.save.apply(this, [].slice.call(arguments));
    }
});

module.exports = Person;