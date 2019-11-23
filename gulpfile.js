//gulpfile.js
var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass');
    browsersync = require('browser-sync').create();

function browserSync() {
        browsersync.init({
            server: {
                baseDir: './landingpage-meetbits'
            }
        });
}

// This is for the path of sass compilation

//Setting up the Watcher

gulp.task('watch', function() {
    gulp.watch(['src/scss/**/*.scss', 'dist/js/**/*.js'], ['styles', 'js']);

});
gulp.task('watchcss', function() {
    gulp.watch(['dist/css/style.css'], ['minify-css']);

});

// This is for the copy node module depandancy to the other folder

var npmDist = require('gulp-npm-dist');


// Copy dependencies to ./public/libs/
gulp.task('copy', function() {
    gulp.src(npmDist(), { base: './node_modules' })
        .pipe(gulp.dest('./assets/libs'));
});

gulp.task('browserSync', browserSync);

//Monitor

gulp.task('default', ['watch', 'watchcss','browserSync']);
