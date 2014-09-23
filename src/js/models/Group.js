var Backbone = require('backbone');

var personCollection = require('../collections/PersonCollection');

function createRelation(personId)
{
    var persons = this.get('_persons');
    persons[personId] = personId;
    this.set('_persons', persons);

    this.save();
}

function destroyRelation(personId)
{
    personId = personId.cid ? personId.id : personId;
    
    var persons = this.get('_persons');
    delete persons[personId];
    this.set('_persons', persons);

    this.save();
}

var Group = Backbone.Model.extend({
    defaults: {
        name: '',
        _persons: null,
    },

    initialize: function(options) {
        this.listenTo(personCollection, 'change:groupId', this.addPerson);
        this.listenTo(personCollection, 'add', this.addPerson);
        this.listenTo(personCollection, 'destroy', destroyRelation);

        this.set('_persons', {});
    },

    hasPerson: function(person) {
        var personId = person.cid ? person.id : person;

        if(!personId) {
            return false;
        }

        return personId in this.get('_persons');
    },

    addPerson: function(person) {
        var personId = person.cid ? person.id : person;

        person = personCollection.get(personId);
        if(!person || person.isNew() || this.isNew()) {
            return;
        }

        if(person.get('groupId') == this.id) {
            createRelation.call(this, personId);
        } else if(person.previousAttributes()['groupId'] == this.id) {
            destroyRelation.call(this, personId);
        }
    },
});

module.exports = Group;