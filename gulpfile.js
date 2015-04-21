var prodPath = "app_prod";
var devPath  = "app_dev";

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
var jasmine     = require('gulp-jasmine-phantom');
var serve       = require('gulp-serve');
var useref      = require('gulp-useref');

 

/** COMPILE SERVICES **/
gulp.task('compileServices', ['lintServices'], function () {
    return gulp.src(devPath +'/services/**/+(Controllers|Models)/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(prodPath +'/scripts'));
});


/** COMPILE VENDORS **/
gulp.task('compileVendors', function () {
    return gulp.src(devPath +'/vendors/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat("vendors.js"))
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(prodPath +'/scripts'));
});


/** COMPILE HTML **/
gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src(devPath +'/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(prodPath));
});


/** RUN TESTS **/ 
gulp.task('tests', ['compileServices'], function () {
    return gulp.src('tests/**/*.js')
        .pipe(jasmine({
            integration: true,
            abortOnFail: true,
            vendor: [prodPath +'/scripts/**/*.js']
        }));
});


/** VERIFY JAVASCRIPT **/
gulp.task('lintServices', function() {
    return gulp.src(devPath +'/services/**/+(Controllers|Models)/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});



/** TASK PROD **/
gulp.task('prod', ['compileServices', 'compileVendors', 'html']);


/** TASK SERVE **/
gulp.task('serve', ['prod'], serve('app_prod'));