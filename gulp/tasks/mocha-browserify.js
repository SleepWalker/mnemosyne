var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

// TODO: Логирование https://github.com/greypants/gulp-starter/blob/master/gulp/tasks/browserify.js

module.exports = function() {
  var bundler = watchify(browserify('./test/test.js', watchify.args));

  // Optionally, you can apply transforms
  // and other configuration options on the
  // bundler just as you would with browserify
  bundler.transform('browserify-shim');
  // bundler.transform('debowerify');

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('test.bundle.js'))
      .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object, to get uglify working
      .pipe(uglify())
      .pipe(gulp.dest('./test'));
  }

  return rebundle();
};