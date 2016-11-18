'use strict';

var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  ts = require('gulp-typescript'),
  tslint = require('gulp-tslint'),
  tsProject = ts.createProject('tsconfig.json'),
  lite = require('lite-server'),
  sass = require('gulp-sass'),
  plug = require('gulp-load-plugins')();

gulp.task('htmlhint', function() {
  return gulp.src('src/index.html')
    .pipe(plug.htmlhint())
    .pipe(plug.htmlhint.reporter());
});

gulp.task('tslint', function() {
  return gulp.src(['src/app/**/*.ts'])
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('sass', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(plug.rename('main.css'))
    .pipe(gulp.dest('src/styles'));
});

gulp.task('ts', function() {
  var sourceTsFiles = [
    'typings/index.d.ts',
    'src/app/app.ts',
    'src/app/core/*.ts',
    'src/app/search-form/search-form.service.ts',
    'src/app/search-form/search-form.component.ts',
    'src/app/search-form/search-form.controller.ts'
  ];
  var tsResult = gulp.src(sourceTsFiles)
    .pipe(ts(tsProject));
  return tsResult.js
    .pipe(gulp.dest('src/app'));
});

gulp.task('bundle', ['ts'], function() {
  browserify({
      entries: [
        'src/bower_components/angular/angular.min.js',
        'src/bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'src/app/output.js'
      ]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('src/app'));
});

gulp.task('watch', function() {
  gulp.watch('src/index.html', ['htmlhint']);
  gulp.watch('src/app/**/*.ts', ['bundle']);
  gulp.watch('src/styles/main.scss', ['sass']);
});

gulp.task('build', ['sass', 'bundle']);
gulp.task('default', ['build', 'watch']);