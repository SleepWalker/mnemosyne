var assert = require('chai').assert;
var sinon = require('sinon');

var contactCollection = require('../src/js/collections/ContactCollection');
var groupCollection = require('../src/js/collections/GroupCollection');

describe('Group', function() {
    beforeEach(function() {
        contactCollection.reset();
        groupCollection.reset();
    });

    describe('Contact management API', function() {
        var expected, group, contact;
        beforeEach(function() {
            expected = 'contact';
            group = new groupCollection.model({
                id: 'groupId',
                name: 'test'
            });
            group.stopListening(); // beacuse we want to test API only
        });

        it('should NOT save reference if Group.isNew()', function() {
            var expected = 'contact';
            var group = new groupCollection.model({
                name: 'test'
            });
            group.stopListening();

            assert.notOk(group.hasContact(expected));

            contactCollection.add({
                'id': expected,
                'surname': 'surname'
            });
            contactCollection.at(0).id = expected;
            group.addContact(contactCollection.at(0));

            assert.notOk(group.hasContact(expected));
        });

        it('should be able to save reference to contacts', function() {
            contactCollection.add({
                'id': expected,
                'groupId': group.id,
                'surname': 'surname'
            });
            contactCollection.at(0).id = expected;
            group.addContact(contactCollection.at(0));

            assert.ok(group.hasContact(expected));
        });

        it('should save itself when new Contact relation is added', function() {
            group.save = sinon.spy();

            contactCollection.add({
                'id': expected,
                'groupId': group.id,
                'surname': 'surname'
            });
            contactCollection.at(0).id = expected;
            group.addContact(contactCollection.at(0));

            assert.ok(group.save.called);
        });

        it('should NOT save if model isNew()', function() {
            group.save = sinon.spy();

            group.addContact(new contactCollection.model({
                'surname': 'surname'
            }));

            assert.notOk(group.save.called);
        });

    });

    describe('Contacts listening', function() {
        // TODO: addContact should be called once
        var group, contact;

        var setContactId = function(id) {
            contact.set('id', id);
            contact[contact.idAttribute] = id;
        };

        beforeEach(function() {
            group  = new groupCollection.model({
                id: 'groupId',
                name: 'test',
            });
            groupCollection.add(group);

            contact  = new contactCollection.model({
                surname: 'test',
                group: group.get('name'),
                groupId: group.get('id')
            });
        });

        it('should grab Contact reference when it was updated', function() {
            setContactId('contactId');
            contactCollection.add(contact);

            assert.ok(group.hasContact(contact));
        });

        it('should NOT grab Contact reference when it has no `id`', function() {
            contactCollection.add(contact);

            assert.notOk(group.hasContact(contactCollection.at(0)));
        });

        describe('Group changing', function() {
            var newGroup;
            beforeEach(function() {
                setContactId('contactId');
                contactCollection.add(contact);

                newGroup = new groupCollection.model({
                    'name': 'new',
                    'id': 'newGroup'
                });
                groupCollection.add(newGroup);
            });

            it('should add relation to the new Group, when Contact changed Group', function() {
                contact.set('groupId', newGroup.id);

                assert.ok(newGroup.hasContact(contact));
            });

            it('should destroy old relation, when Contact Group changed', function() {
                contact.set('groupId', newGroup.id);

                assert.notOk(group.hasContact(contact));
            });

            it('should destroy relation, when Contact destroyed', function() {
                var id = contact.id;
                
                contact.destroy();

                assert.notOk(group.hasContact(id));
            });
        });
    });
});