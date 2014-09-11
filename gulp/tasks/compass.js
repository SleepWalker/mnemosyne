var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var cmq = require('gulp-combine-media-queries');
var plumber = require('gulp-plumber');

module.exports = function() {
  return gulp.src('src/sass/style.scss')
  .pipe(plumber())
  .pipe(sass({
    compass: true,
    bundleExec: true,
    sourcemap: true,
    sourcemapPath: '../../src/sass'
  }))
  .pipe(cmq({
      log: true
    }))
  .pipe(gulp.dest('./dist/css'));
};