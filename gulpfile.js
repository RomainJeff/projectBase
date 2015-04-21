var prodPath = "app_prod";
var devPath  = "app_dev";
var uglifyConfig = {
    mangle: false
};
var jasmineConfig = {
    integration: true,
    abortOnFail: true,
    vendor: [prodPath +'/scripts/**/*.js']
};

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var babel       = require('gulp-babel');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
var jasmine     = require('gulp-jasmine-phantom');
var serve       = require('gulp-serve');
var useref      = require('gulp-useref');
var compass     = require('gulp-for-compass');
var uglify      = require('gulp-uglify');

 

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
    return gulp.src(devPath +'/vendors/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat("vendors.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(prodPath +'/scripts'));
});


/** UGLIFY VENDORS **/
gulp.task('uglifyVendors', ['compileVendors'], function () {
    return gulp.src(prodPath +'/scripts/vendors.js')
        .pipe(uglify(uglifyConfig))
        .pipe(gulp.dest(prodPath +'/scripts'));
});


/** COMPILE FRAMEWORK **/
gulp.task('compileFramework', function () {
    return gulp.src(devPath +'/vendors/framework/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat("framework.js"))
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


/** COMPILE COMPASS **/
gulp.task('compass', function () {
    return gulp.src(devPath +'/resources/scss/**/*.scss')
        .pipe(compass({
            sassDir: devPath +'/resources/scss',
            cssDir: prodPath +'/styles',
            outputStyle: 'compressed'
        }));
});


/** VERIFY JAVASCRIPT **/
gulp.task('lintServices', function() {
    return gulp.src(devPath +'/services/**/+(Controllers|Models)/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});



/** RUN TESTS **/ 
gulp.task('tests', ['compileServices'], function () {
    return gulp.src('tests/**/*.js')
        .pipe(jasmine(jasmineConfig));
});


/** TASK PROD **/
gulp.task('prod', ['compileServices', 'uglifyVendors', 'compileFramework', 'html', 'compass']);


/** TASK SERVE **/
gulp.task('serve', ['prod'], serve('app_prod'));
