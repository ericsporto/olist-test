const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');

gulp.task(
  'sass',
  gulp.series(function () {
    return gulp
      .src(['src/scss/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
  })
);

gulp.task(
  'server',
  gulp.series('sass', function () {
    browserSync.init({
      server: 'src',
    });
    gulp.watch(['src/scss/*.scss'], gulp.parallel(['sass']));
    gulp
      .watch(['src/*.html', 'src/css/*.css'])
      .on('change', gulp.parallel(browserSync.reload));
  })
);

gulp.task('minify-js', function() {
  return gulp.src('src/js/*.js')
    .pipe(minify({
      noSource: true,
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', gulp.series(['server', 'minify-js', 'minify-css']));
