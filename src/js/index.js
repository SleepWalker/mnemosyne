// TODO: https://github.com/douglascrockford/JSON-js
 
// TODO: Tests for Deletable mixin
// TODO: Прятать формы по клику на боди и по esc
// TODO: если открыть контакт на редактирование, отредактировать добавив новое поле. то при сейве перестает работать morph
// TODO: пофиксить размытие на попапах форм в Chrome (судя по всему как-то связано с 3д ускорением)


// http://tympanus.net/Tutorials/PagePreloadingEffect/
// http://tympanus.net/Development/SidebarTransitions/
// http://tympanus.net/Development/GridLoadingEffects/index3.html

// Init Backbone jQuery relation
var Backbone = require('backbone');
Backbone.$ = require('jquery');

var App = require('./App');
var WebStorage = require('./persistance/WebStorage');

// TODO: этот файл не должен знать о ключе с id хранилища
var storageId = localStorage.getItem('storageId');
var storage = storageId ? new WebStorage(storageId) : new WebStorage();

App.configure({
    beforeRun: function() {
        require('./collections/PersonCollection').fetch();
        require('./collections/GroupCollection').fetch();
    },
    components: {
        storage: require('./persistance/Storage').setStorage(storage),
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
                '#region-person-add': [
                    [require('./views/PersonCardAddAction'), {$formRenderTarget: 'body'}]
                ],
                '#region-user': require('./views/UserView'),
            }
        })
    }
});

App.run();