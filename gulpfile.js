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
const sourcemaps = require('gulp-sourcemaps');
const compass = require('gulp-compass');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
 
// gulp.task('default', () =>
//     gulp.src('src/main.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         })
//     )
//     .pipe(gulp.dest('src/main.min.js'))
//     // .pipe( uglify() )
//     // .pipe(gulp.dest('src/main.min.js'))
//     .pipe( notify( { message: 'TASK: "customJs" Completed! 💯', onLast: true } ) )
// );
const config = {
    bable: {
        presets: ['@babel/env']
    },
};
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
    .pipe( compass( {
        config_file: 'config.rb',
        sourcemap: true,
        css: 'assets/css',
        sass: 'scss',
        image: 'assets/images'
    } ) )
//    .on( 'error', error => {
//        console.log(error);
//    } )
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

// gulp.task('default', (cb) => {
//     return gulp.src('src/main.js')
//     .pipe( babel( config.bable ) )
//     .pipe( gulp.dest('dist') )
//     .pipe( rename( {suffix: '.min' } ) )
//     .pipe( uglify() )
//     .pipe( gulp.dest('dist') )
//     .pipe( notify( { message: 'TASK Completed! 💯', onLast: true } ) );
// } );