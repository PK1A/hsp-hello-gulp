var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var template = require('gulp-template');
var hsp = require('gulp-hashspace');
var noder = require('gulp-noder');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

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

gulp.task('default', ['package']);

gulp.task('clean', function(){
    //clean up the destination folder
    //remember to return a stream here so a subsequent task wait for the clean to end
    return gulp.src('dist/*.*', {read: false}).pipe(clean());
});

gulp.task('build', function () {
    gulp.src('src/**/index.html').pipe(template({
        hspVersion: hspVersion,
        noderVersion: noder.version
    })).pipe(gulp.dest('dist'));
    gulp.src('src/**/*.+(hsp|js)').pipe(hsp.process()).pipe(gulp.dest('dist'));
});

gulp.task('package', function () {
    gulp.src('src/**/*.+(hsp|js)')
        .pipe(hsp.process())        //compile and transpile #space files
        .pipe(noder.package('/src'))//wrap CommonJS so they can be loaded with Noder.js
        .pipe(concat('all.min.js')) //combine files together
        .pipe(noder.wrap())         //entire file wrapping needed by Noder.js
        .pipe(uglify())             //minify
        .pipe(gulp.dest('dist'));   //copy to the destination folder
});

gulp.task('play', ['clean'], function () {

    var wwwServerPort = 8000;

    //observe files for changes
    watch({glob: 'src/**/index.html'}, function (files) {
        files.pipe(template({
            hspVersion: hspVersion,
            noderVersion: noder.version
        })).pipe(gulp.dest('dist'));
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