/**
 * Gulp Config
 * 
 */
const app = require('./package.json');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const prettify = require('gulp-js-prettify');
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
    prettify: {
        "indent_with_tabs": true,
    }
};

// Tasks
gulp.task('compile:js', () => {
    return gulp.src(['src/js/*.js','!src/js/**/*.min.js'])
    .pipe( sourcemaps.init( {largeFile: true} ) )
    .pipe( eslint() )
    .pipe( eslint.format() )
    .pipe( babel( config.bable ) )
    .on( 'error', notify.onError({ title: "Error", message: "Error: <%= error.message %>" }) )
    .pipe( prettify( config.prettify ) )
    .pipe( gulp.dest('assets/js') )
    .pipe( uglify() )
    .pipe( rename( {suffix: '.min' } ) )
    .pipe( sourcemaps.write( '/.') )
    .pipe( gulp.dest('assets/js') )
    .pipe( notify( { message: 'TASK: Compile:JS Completed! 💯', onLast: true } ) );
} );
gulp.task('compile:scss', () => {
    return gulp.src( 'src/scss/*.scss' )
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
    gulp.watch( ['src/js/*.js','!src/js/**/*.min.js'], gulp.series( 'compile:js' ) );
    gulp.watch( 'src/scss/**/*.scss', gulp.series( 'compile:scss' ) );
});