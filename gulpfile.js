var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var hsp = require('gulp-hsp-compiler');

var connect = require('connect');
var http = require('http');

gulp.task('default', function() {
    gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
    gulp.src('src/**/*.hsp').pipe(hsp()).pipe(gulp.dest('dist'));
});

gulp.task('play', function() {

    //observe files for changes
    watch({glob: 'src/**/*.html'}, function(files) {
        files.pipe(gulp.dest('dist'));
    });
    watch({glob: 'src/**/*.hsp'}, function(files) {
        files.pipe(hsp().on('error', gutil.log)).pipe(gulp.dest('dist'));
    });

    gutil.log('Starting WWW server at http://localhost:8000');
    http.createServer(connect().use(connect.static('./dist'))).listen(8000);
});