// TODO: https://github.com/douglascrockford/JSON-js
// TODO: emulate local storage but tell the user, that the data will be lost
// 
// TODO: Tests for Deletable mixin
// TODO: Прятать формы по клику на боди и по esc

// http://tympanus.net/Tutorials/PagePreloadingEffect/
// http://tympanus.net/Development/SidebarTransitions/
// http://tympanus.net/Development/GridLoadingEffects/index3.html

// Init Backbone jQuery relation
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var App = require('./App');
var WebStorage = require('./persistance/WebStorage');

App.configure({
    beforeRun: function() {
        require('./collections/PersonCollection').fetch();
        require('./collections/GroupCollection').fetch();
    },
    components: {
        storage: require('./persistance/Storage').setStorage(new WebStorage()),
        composer: require('./dom/DOMComposer')({
            regions: {
                '#region-groups': [
                    [require('./views/GroupFilterList'), {itemViewOptions: {$formRenderTarget: '#region-groups'}}]
                ],
                '#region-group-add': [
                    [require('./views/GroupAddAction'), {$formRenderTarget: '#region-groups'}]
                ],
                '#region-search': require('./views/SearchForm'),
                '#region-person-cards': [
                    [require('./views/PersonCardList'), {itemViewOptions: {$formRenderTarget: 'body'}}]
                ],
                '#region-person-add': require('./views/PersonCardAddAction'),
                '#region-user': require('./views/UserView'),
            }
        })
    }
});

App.run();