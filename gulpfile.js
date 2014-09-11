// TODO:
// переименовать build в src
//  - gulp-watch
//  
// gulp-changed - only pass through changed files
// gulp-cached - in-memory file cache, not for operation on sets of files
// gulp-remember - pairs nicely with gulp-cached
// gulp-newer - pass through newer source files only, supports many:1 source:dest


var tasks = [
    'compass',
    'imagemin',
    'fonts',
    'browserify',
    // 'mocha',
    'mocha-phantomjs',
    'mocha-browserify',
    'browsersync'
    ];
var gulp = require('./gulp')(tasks);

var browserSync = require('browser-sync');
var reload = browserSync.reload;

// gulp.task('build', ['compass']);
gulp.task('watch', function() {
    gulp.watch('src/sass/**', ['compass']);
    gulp.watch('src/images/**', ['imagemin']);
    gulp.watch('src/fonts/**', ['fonts']);
    // gulp.watch(['src/js/**', 'test/**'], ['mocha']);
    gulp.watch(['src/js/**', 'test/**'], ['mocha-phantomjs']);

    gulp.watch(['../*.{html,php}', 'css/**/*.css', 'js/**/*.js', 'images/**/*.js'], reload);
});
gulp.task('default', ['browserify', 'mocha-browserify', 'watch']);