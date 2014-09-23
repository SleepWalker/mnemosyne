var assert = require('chai').assert;
var sinon = require('sinon');

var personCollection = require('../src/js/collections/PersonCollection');
var groupCollection = require('../src/js/collections/GroupCollection');

describe('Group', function() {
    beforeEach(function() {
        personCollection.reset();
        groupCollection.reset();
    });

    describe('Person management API', function() {
        var expected, group;
        beforeEach(function() {
            expected = 'person';
            group = new groupCollection.model({
                id: 'groupId',
                name: 'test'
            });
            group.stopListening(); // beacuse we want to test API only
        });

        it('should NOT save reference if Group.isNew()', function() {
            var group = new groupCollection.model({
                name: 'test'
            });
            group.stopListening();

            assert.notOk(group.hasPerson(expected));

            personCollection.add({
                'id': expected,
                'surname': 'surname'
            });
            personCollection.at(0).id = expected;
            group.addPerson(personCollection.at(0));

            assert.notOk(group.hasPerson(expected));
        });

        it('should be able to save reference to persons', function() {
            personCollection.add({
                'id': expected,
                'groupId': group.id,
                'surname': 'surname'
            });
            personCollection.at(0).id = expected;
            group.addPerson(personCollection.at(0));

            assert.ok(group.hasPerson(expected));
        });

        it('should save itself when new Person relation is added', function() {
            group.save = sinon.spy();

            personCollection.add({
                'id': expected,
                'groupId': group.id,
                'surname': 'surname'
            });
            personCollection.at(0).id = expected;
            group.addPerson(personCollection.at(0));

            assert.ok(group.save.called);
        });

        it('should NOT save if model isNew()', function() {
            group.save = sinon.spy();

            group.addPerson(new personCollection.model({
                'surname': 'surname'
            }));

            assert.notOk(group.save.called);
        });

    });

    describe('Persons listening', function() {
        // TODO: addPerson should be called once
        var group, person;

        var setPersonId = function(id) {
            person.set('id', id);
            person[person.idAttribute] = id;
        };

        beforeEach(function() {
            group  = new groupCollection.model({
                id: 'groupId',
                name: 'test',
            });
            groupCollection.add(group);

            person = new personCollection.model({
                surname: 'test',
                group: group.get('name'),
                groupId: group.get('id')
            });
        });

        it('should grab Person reference when it was updated', function() {
            setPersonId('personId');
            personCollection.add(person);

            assert.ok(group.hasPerson(person));
        });

        it('should NOT grab Person reference when it has no `id`', function() {
            personCollection.add(person);

            assert.notOk(group.hasPerson(personCollection.at(0)));
        });

        describe('Group changing', function() {
            var newGroup;
            beforeEach(function() {
                setPersonId('personId');
                personCollection.add(person);

                newGroup = new groupCollection.model({
                    'name': 'new',
                    'id': 'newGroup'
                });
                groupCollection.add(newGroup);
            });

            it('should add relation to the new Group, when Person changed Group', function() {
                person.set('groupId', newGroup.id);

                assert.ok(newGroup.hasPerson(person));
            });

            it('should destroy old relation, when Person Group changed', function() {
                person.set('groupId', newGroup.id);

                assert.notOk(group.hasPerson(person));
            });

            it('should destroy relation, when Person destroyed', function() {
                var id = person.id;
                
                person.destroy();

                assert.notOk(group.hasPerson(id));
            });
        });
    });
});