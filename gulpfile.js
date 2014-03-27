var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var hspCompile = require('gulp-hsp-compiler');
var hspTranspile = require('gulp-hsp-transpiler');
var connect = require('connect');
var http = require('http');
var karma = require('karma').server;
var _ = require('lodash');

var karmaCommonConf = {
    browsers: ['Chrome'],
    files: [
        'src/**/*.hsp',
        'src/**/*.js',
        'test/**/*.spec.js',
        './node_modules/hashspace/hsp/*.js',
        './node_modules/hashspace/hsp/rt/**/*.js',
        './node_modules/hashspace/hsp/gestures/**/*.js'
    ],
    frameworks: ['mocha', 'chai', 'commonjs'],
    preprocessors: {
        'src/**/*.hsp': ['hsp', 'commonjs'],
        'src/**/*.js': ['commonjs'],
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
    gulp.src('src/**/*.hsp')
        .pipe(hspCompile())
        .pipe(hspTranspile())
        .pipe(gulp.dest('dist'));
    gulp.src('src/**/*.js')
        .pipe(hspTranspile())
        .pipe(gulp.dest('dist'));
});

gulp.task('play', function () {

    var wwwServerPort = 8000;

    //observe files for changes
    watch({glob: 'src/**/*.html'}, function (files) {
        files.pipe(gulp.dest('dist'));
    });
    watch({glob: 'src/**/*.hsp'}, function (files) {
        files
            .pipe(hspCompile().on('error', gutil.log))
            .pipe(hspTranspile().on('error', gutil.log))
            .pipe(gulp.dest('dist'));
    });
    watch({glob: 'src/**/*.js'}, function (files) {
        files
            .pipe(hspTranspile().on('error', gutil.log))
            .pipe(gulp.dest('dist'));
    });

    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    http.createServer(connect().use(connect.static('./dist'))).listen(wwwServerPort);
});

gulp.task('test', function () {
    karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), karmaExit);
});

gulp.task('tdd', function () {
    karma.start(_.assign({}, karmaCommonConf), karmaExit);
});