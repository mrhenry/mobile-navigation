var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    paths = {};

paths.stylesheets = ['./scss/**/*.scss', './scss/*.scss'];
paths.javascripts = ['./js/*.js'];

gulp.task('sass', function () {
  gulp.src(paths.stylesheets)
      .pipe(sass())
      .pipe(gulp.dest('./css'));
});

gulp.task('jsmin', function () {
  gulp.src(paths.javascripts)
      .pipe(jsmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('copy', ['sass'], function () {
  gulp.src(['./scss/_settings.scss', './scss/_mobile-navigation.css.scss'])
      .pipe(gulp.dest('./dist'));
})

gulp.task('watch', ['sass'], function () {
  gulp.watch(paths.stylesheets, ['sass']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['jsmin', 'copy']);