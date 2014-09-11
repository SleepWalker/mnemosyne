var gulp = require('gulp');

module.exports = function() {
    return gulp.src('src/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
};