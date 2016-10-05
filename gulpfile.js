var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

var jsLibs = [
  
];


var paths = {
  sass: ['./scss/**/*.scss'],
  js: [
    './js/app.js',
    './js/features/**/*.js'
  ],
  es6: [
    './js/es6/**/*.js',
    './js/es6/*.js'
  ]
};


gulp.task('default', ['sass']);


gulp.task('serve', [], function(cb){

    browserSync.init({
        open: true,
        server: {
            baseDir: "www"
        }
    });

    gulp.watch(paths.sass, ['sass', 'serve:reload']);
    gulp.watch(paths.js, ['lint', 'concat_js', 'serve:reload']);
    gulp.watch(paths.es6, ['es6:concat', 'es6:transpile', 'serve:reload']);
    gulp.watch(jsLibs, ['concat_libs', 'serve:reload']);

});

gulp.task('serve:reload' , []  , function(){
  browserSync.reload();
});

gulp.task('sass', function(done) {
  gulp.src('./scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('concat_js', function() {
  return gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('es6:concat', function() {
  return gulp.src(paths.es6)
    .pipe(concat('app.es6.js'))
    .pipe(gulp.dest('./www/js/build/'));
});

gulp.task('es6:transpile', function() {
    return gulp.src('www/js/build/app.es6.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('www/js'));
});

gulp.task('concat_libs', function() {
  return gulp.src(jsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['lint', 'concat_js']);
  gulp.watch(jsLibs, ['concat_libs']);
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
