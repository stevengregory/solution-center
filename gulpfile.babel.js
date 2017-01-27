'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import ts from 'gulp-typescript';
import tslint from 'gulp-tslint';

const tsProject = ts.createProject('tsconfig.json');

gulp.task('tslint', () => {
  return gulp.src(['src/app/**/*.ts'])
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report())
});

gulp.task('sass', () => {
  return gulp.src('src/styles/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('src/styles'));
});

gulp.task('ts', ['tslint'], () => {
  let sourceTsFiles = [
    'typings/index.d.ts',
    'src/app/app.ts',
    'src/app/core/*.ts',
    'src/app/search-form/*.ts'
  ];
  let tsResult = gulp.src(sourceTsFiles)
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('src/app'));
});

gulp.task('bundle', ['ts'], () => {
  browserify({
      entries: [
        'src/bower_components/angular/angular.min.js',
        'src/app/output.js'
      ]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('src/app'));
});

gulp.task('watch', () => {
  gulp.watch('src/app/**/*.ts', ['bundle']);
  gulp.watch('src/styles/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'bundle']);
gulp.task('default', ['build', 'watch']);