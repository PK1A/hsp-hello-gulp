var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var template = require('gulp-template');
var hsp = require('gulp-hashspace');
var connect = require('connect');
var http = require('http');
var karma = require('karma').server;
var _ = require('lodash');

var hspVersion = require('hashspace/package.json').version;

var karmaCommonConf = {
    browsers: ['Chrome'],
    files: [
        'src/**/*.+(hsp|js)',
        'test/**/*.spec.js'
    ],
    frameworks: ['mocha', 'chai', 'hsp', 'commonjs'],
    preprocessors: {
        'src/**/*.hsp': ['hsp-compile', 'commonjs'],
        'src/**/*.js': ['hsp-transpile', 'commonjs'],
        'test/**/*.spec.js': ['commonjs'],
        './node_modules/hashspace/hsp/**/*.js': ['commonjs']
    },
    commonjsPreprocessor: {
        modulesRoot: './node_modules/hashspace'
    }
};

gulp.task('default', function () {
    gulp.src('src/**/index.html').pipe(template({version: hspVersion})).pipe(gulp.dest('dist'));
    gulp.src('src/**/*.+(hsp|js)').pipe(hsp.process()).pipe(gulp.dest('dist'));
});

gulp.task('play', function () {

    var wwwServerPort = 8000;

    //observe files for changes
    watch({glob: 'src/**/index.html'}, function (files) {
        files.pipe(template({version: hspVersion})).pipe(gulp.dest('dist'));
    });
    watch({glob: 'src/**/*.+(hsp|js)'}, function (files) {
        files.pipe(hsp.process().on('error', gutil.log)).pipe(gulp.dest('dist'));
    });
    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    http.createServer(connect().use(connect.static('./dist'))).listen(wwwServerPort);
});

gulp.task('test', function (done) {
    karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('tdd', function (done) {
    karma.start(_.assign({}, karmaCommonConf), done);
});