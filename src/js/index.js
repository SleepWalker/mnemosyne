// TODO: https://github.com/douglascrockford/JSON-js
// TODO: emulate local storage but tell the user, that the data will be lost
// 
// TODO: decorator http://open.bekk.no/mixins-in-backbone

// Init Backbone jQuery relation
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var App = require('./App');
var WebStorage = require('./persistance/WebStorage');
WebStorage.open();


/**
 * LOREMIMPSUM
 */
var collection = require('./collections/ContactCollection');
collection.add([{
    name: 'test'
}, {
    name: 'test22'
}]);

var collection = require('./collections/GroupCollection');
collection.add([{
    name: 'testGroup'
}, {
    name: 'testGroup22'
}]);
/**
 * LOREMIMPSUM
 */

App.configure({
    components: {
        storage: require('./persistance/Storage').setStorage(WebStorage),
        composer: require('./dom/DOMComposer')({
            regions: {
                '#region-groups': require('./views/GroupList'),
                '#region-search': require('./views/SearchForm'),
                '#region-contacts': require('./views/ContactCardList'),
                '#region-contacts-form': require('./views/ContactCardForm'),
            }
        })
    }
});

App.run();