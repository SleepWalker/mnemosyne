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
});

module.exports = Person;