var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var hsp = require('gulp-hsp-compiler');
var connect = require('connect');
var http = require('http');
var karma = require('karma').server;
var _ = require('lodash');

var karmaCommonConf = {
    browsers: ['Chrome'],
    files: [
        'src/**/*.hsp',
        'test/**/*.spec.js',
        './node_modules/hashspace/hsp/*.js',
        './node_modules/hashspace/hsp/rt/**/*.js',
        './node_modules/hashspace/hsp/gestures/**/*.js'
    ],
    frameworks: ['mocha', 'chai', 'commonjs'],
    preprocessors: {
        'src/**/*.hsp': ['hsp', 'commonjs'],
        'test/**/*.spec.js': ['commonjs'],
        './node_modules/hashspace/hsp/**/*.js': ['commonjs']
    },
    commonjsPreprocessor: {
        modulesRoot: './node_modules/hashspace'
    }
};

function karmaExit(exitCode) {
    gutil.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
}

gulp.task('default', function () {
    gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
    gulp.src('src/**/*.hsp').pipe(hsp()).pipe(gulp.dest('dist'));
});

gulp.task('play', function () {

    //observe files for changes
    watch({glob: 'src/**/*.html'}, function (files) {
        files.pipe(gulp.dest('dist'));
    });
    watch({glob: 'src/**/*.hsp'}, function (files) {
        files.pipe(hsp().on('error', gutil.log)).pipe(gulp.dest('dist'));
    });

    gutil.log('Starting WWW server at http://localhost:8000');
    http.createServer(connect().use(connect.static('./dist'))).listen(8000);
});

gulp.task('test', function () {
    karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), karmaExit);
});

gulp.task('tdd', function () {
    karma.start(_.assign({}, karmaCommonConf), karmaExit);
});