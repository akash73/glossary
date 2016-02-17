'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del'],
});

var baseUrl = "//d3v4v7z64baj2s.cloudfront.net";
var version = Math.random().toString(36).slice(-10);
var dist = "public";

gulp.task('changeUrl', function () {
    baseUrl = "//localhost:8000";
});

gulp.task('clean', function () {
    $.del.sync(dist);
});

gulp.task('hugo', function () {
    exec('hugo --config="config_en.toml" --baseURL="'+baseURL+'/en"');
});

gulp.task('watch', function () {
    $.watch(['content/**/*', 'layouts/**/*', 'static/**/*'], $.batch(function (events, done) {
        gulp.start('build:dev', done);
    }));
});

gulp.task('webserver', function () {
    gulp.src(dist)
        .pipe($.webserver({livereload: true}));
});

gulp.task('build', ['clean', 'hugo']);

gulp.task('build:dev', ['changeUrl', 'build']);

gulp.task('default', ['watch', 'webserver']);
