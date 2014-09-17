// TODO: https://github.com/douglascrockford/JSON-js
// TODO: emulate local storage but tell the user, that the data will be lost
// 
// TODO: Tests for Deletable mixin
// TODO: Прятать формы по клику на боди и по esc

// http://tympanus.net/Tutorials/PagePreloadingEffect/
// http://tympanus.net/Development/SidebarTransitions/
// http://tympanus.net/Development/GridLoadingEffects/index3.html
// http://tympanus.net/Development/ButtonComponentMorph/index3.html


// Init Backbone jQuery relation
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var App = require('./App');
var WebStorage = require('./persistance/WebStorage');


/**
 * LOREMIMPSUM
 */
var collection = require('./collections/ContactCollection');
collection.add([{
    'id': 'test',
    name: 'test',
    surname: 'zz3',
    group: 'testGroup',
    groupId: 'one'
}, {
    id: 'test22',
    name: 'test22',
    surname: 'zz2',
    group: 'testGroup22',
    groupId: 'two'
}]);

var collection = require('./collections/GroupCollection');
collection.add([{
    name: 'testGroup',
    id: 'one',
    contacts: {test: 'test'}
}, {
    id: 'two',
    contacts: {test22: 'test22'},
    name: 'testGroup22'
}]);
/**
 * /LOREMIMPSUM
 */

App.configure({
    components: {
        storage: require('./persistance/Storage').setStorage(new WebStorage()),
        composer: require('./dom/DOMComposer')({
            regions: {
                '#region-groups': require('./views/GroupList'),
                '#region-group-add': require('./views/GroupAddAction'),
                '#region-search': require('./views/SearchForm'),
                '#region-contacts': require('./views/ContactCardList'),
                '#region-contact-add': require('./views/ContactCardAddAction'),
            }
        })
    }
});

App.run();