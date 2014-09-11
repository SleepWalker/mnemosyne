var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');


module.exports = function () {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
        }))
        .on('error', gutil.log);
};
