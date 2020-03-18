/**
 * Gulp Config
 * 
 */
const app = require('./package.json');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');

const config = {
    bable: {
        presets: ['@babel/env']
    },
};

// Tasks
gulp.task('compile:js', () => {
    return gulp.src(['assets/js/*.js','!assets/js/**/*.min.js'])
    .pipe( sourcemaps.init( {largeFile: true} ) )
    .pipe( eslint() )
    .pipe( eslint.format() )
    .pipe( babel( config.bable ) )
    .on( 'error', notify.onError({ title: "Error", message: "Error: <%= error.message %>" }) )
    .pipe( uglify() )
    .pipe( rename( {suffix: '.min' } ) )
    .pipe( sourcemaps.write( '/.') )
    .pipe( gulp.dest('assets/js') )
    .pipe( notify( { message: 'TASK: Compile:JS Completed! 💯', onLast: true } ) );
} );
gulp.task('compile:scss', () => {
    return gulp.src( 'scss/*.scss' )
    .pipe(sass().on('error', sass.logError))
    .on( 'error', notify.onError({ title: "Error", message: "Error: <%= error.message %>" }) )
    .pipe( autoprefixer( { cascade: false } ) )
    .pipe( gulp.dest('assets/css') )
    .pipe( minifyCSS() )
    .pipe( rename( {suffix: '.min' } ) )
    .pipe( gulp.dest('assets/css') )
    .pipe( notify( { message: 'TASK: Compile:SCSS Completed! 💯', onLast: true } ) );
});
gulp.task( 'build', gulp.series( 'compile:js', 'compile:scss' ) );
gulp.task('watch', function () {
    gulp.watch( ['assets/js/*.js','!assets/js/**/*.min.js'], gulp.series( 'compile:js' ) );
    gulp.watch( 'scss/**/*.scss', gulp.series( 'compile:scss' ) );
});