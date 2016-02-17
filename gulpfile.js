'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del'],
});

var baseUrl = "//d2hq2mp74h4gmr.cloudfront.net";
var version = Math.random().toString(36).slice(-10);
var dist = "public";

gulp.task('clean', function () {
    $.del.sync(dist);
});

gulp.task('hugo', function () {
    exec('hugo --config="config_en.toml"');
});

gulp.task('watch', function () {
    $.watch(['content/**/*', 'layouts/**/*', 'static/**/*'], $.batch(function (events, done) {
        gulp.start('build', done);
    }));
});

gulp.task('webserver', function () {
    gulp.src(dist)
        .pipe($.webserver({livereload: true}));
});

gulp.task('build', ['clean', 'hugo']);

gulp.task('default', ['watch', 'webserver']);
