'use strict';

var gulp = require('gulp');

var less = require('gulp-less');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-minify-css');

var paths = {
  less: 'less/**/*.less',
  lessMain: 'less/thin.less',
};

gulp.task('less', function() {
  return gulp.src(paths.lessMain)
    // Pass in options to the task
    .pipe(less())
    .pipe(autoprefixer([
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24', // Firefox 24 is the latest ESR
      'Explorer >= 8',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6']))
    .pipe(csscomb())
    .pipe(gulp.dest('css'))
    // Minified version
    .pipe(concat('thin.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('css'))
    .pipe(reload({ stream: true }));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  browserSync({
    server: {
      baseDir: 'test'/*,
      host: '0.0.0.0'*/
    }
  });

  gulp.watch(paths.less, ['less']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'less']);
