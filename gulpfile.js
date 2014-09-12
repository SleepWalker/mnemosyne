var tasks = {
    'compass': {
        loadPath: "bower_components/foundation/scss"
    },
    'imagemin': {},
    'fonts': {},
    'browserify': {},
    'browsersync': {
        'host': 'mnemosyne.glp',
        'injectChanges': true,
    },
    'watch': {},
    'mocha-phantomjs': {},
    'mocha-browserify': {},
    };
var gulp = require('sleepwalker-gulp-bootstrap')(tasks);

gulp.task('default', ['browsersync', 'browserify', 'mocha-browserify', 'watch']);