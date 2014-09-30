var assert = require('chai').assert;
var sinon = require('sinon');

var collection = require('../src/js/collections/PersonCollection');


describe('PersonCollection', function() {
    afterEach(function() {
        collection.reset();
    });

    it('should have url property', function() {
        assert.ok(collection.url);
    });

    it('should be sorted alphabetically', function() {
        collection.add({surname: 'b'});
        collection.add({surname: 'a'});

        assert.equal(collection.at(0).get('surname'), 'a');
    });

    describe('search', function() {
        it('should trigger `search` event, when group search criterium changed', function() {
            var called = false;
            collection.on('search', function() {
                called = true;
            });

            collection.setGroupCriterium('groupId');

            assert.ok(called);
        });

        it('should trigger `search` event, when search text changed', function() {
            var called = false;
            collection.on('search', function() {
                called = true;
            });

            collection.setTextCriterium('text');

            assert.ok(called);
        });

        it('should filter the persons without group', function() {
            var expected = '';

            collection.setGroupCriterium(expected);

            assert.strictEqual(collection.getCriterium().groupId, expected);
        });

        it('#getCriterium should return current search criterium', function() {
            var expected = {
                groupId: 'group123',
                text: 'test text',
            };

            collection.setGroupCriterium(expected.groupId);
            collection.setTextCriterium(expected.text);

            assert.deepEqual(collection.getCriterium(), expected);
        });

        it('should pass criterium to event handler', function() {
            var expected = {
                groupId: 'group123',
                text: 'test text',
            };

            var actual = false;
            collection.on('search', function(criterium) {
                actual = criterium;
            });

            collection.setGroupCriterium(expected.groupId);
            collection.setTextCriterium(expected.text);

            assert.deepEqual(actual, expected);
        });
    });
});