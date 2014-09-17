var Backbone = require('backbone');

var contactCollection = require('../collections/ContactCollection');

function createRelation(contactId)
{
    var contacts = this.get('contacts');
    contacts[contactId] = contactId;
    this.set('contacts', contacts);

    this.save();
}

function destroyRelation(contactId)
{
    contactId = contactId.cid ? contactId.id : contactId;
    
    var contacts = this.get('contacts');
    delete contacts[contactId];
    this.set('contacts', contacts);

    this.save();
}

var Group = Backbone.Model.extend({
    defaults: {
        name: '',
        contacts: null,
    },

    initialize: function(options) {
        this.listenTo(contactCollection, 'change:groupId', this.addContact);
        this.listenTo(contactCollection, 'add', this.addContact);
        this.listenTo(contactCollection, 'destroy', destroyRelation);

        this.set('contacts', {});
    },

    hasContact: function(contact) {
        var contactId = contact.cid ? contact.id : contact;

        if(!contactId) {
            return false;
        }

        return contactId in this.get('contacts');
    },

    addContact: function(contact) {
        var contactId = contact.cid ? contact.id : contact;

        contact = contactCollection.get(contactId);
        if(!contact || contact.isNew() || this.isNew()) {
            return;
        }

        if(contact.get('groupId') == this.id) {
            createRelation.call(this, contactId);
        } else if(contact.previousAttributes()['groupId'] == this.id) {
            destroyRelation.call(this, contactId);
        }
    },
});

module.exports = Group;