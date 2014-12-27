"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    sass = require('gulp-ruby-sass');

//Scss to css
gulp.task('scss', function(){
   gulp.src('app/scss/**/*.scss')
       .pipe(sass())
       .pipe(gulp.dest('app/css/'))
});

//Clear dist
gulp.task('clean', function () {
    return gulp.src('dist/*')
        .pipe(clean({force: true}));
});

// Assembly project
gulp.task('dist', function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

//Work with bower
gulp.task('wiredep', function () {
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_component'
        }))
        .pipe(gulp.dest('app'));
});

//Server
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
    opn('http://localhost:8080/');
});

//html
gulp.task('html', function(){
    gulp.src('app/*.html')
        .pipe(connect.reload());
})

//css
gulp.task('css', function(){
    gulp.src('app/css/*.css')
        .pipe(connect.reload());
})

//scss
gulp.task('scss', function(){
    gulp.src('app/scss/*.scss')
        .pipe(connect.reload());
})

//js
gulp.task('js', function(){
    gulp.src('app/js/*.js')
        .pipe(connect.reload());
})

//watch
gulp.task('watch', function(){
    gulp.watch(['app/*.html'], ['html']);
    gulp.watch(['app/css/*.css'], ['css']);
    gulp.watch(['app/scss/**/*.scss'], ['scss']);
    gulp.watch(['app/js/*.js'], ['js']);
    gulp.watch('bower.json', ['wiredep']);
})

//default
gulp.task('default', ['connect', 'watch']);