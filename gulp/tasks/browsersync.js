var gulp = require('gulp');
var browserSync = require('browser-sync');

// watch files for changes and reload
module.exports = function() {
  browserSync({
    // browsersync выдаст нам свой url, но все запросы будут проходить через url proxy
    proxy: "mnemosyne.glp",
    // создание локального сервера
    // server: {
    //   baseDir: 'assets'
    // },
    injectChanges: false, // нужно для Yii, так как для обновления ассетов всегда нужен доп. запрос к серверу
    // browser: ['firefox', 'google chrome'], // браузеры, в которых надо запустить сайт. по умолчанию — дефолтный браузер
    // все, что меняется в ассетах будет приводить к обновлению контента
    files: 'dist/**'
  });
};