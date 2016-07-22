// Dependencies
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass   = require('gulp-ruby-sass');
var maps   = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var paths  = {
  scripts: ['src/js/*.js','src/js/**/*.js'],
  styles: 'src/sass/*.s*ss',
  images: 'src/img/*',
  templates: 'src/**/*html',
  data: '*.json',
};
// Convert, minify and sourcemap the styles
gulp.task('styles', function () {
  return sass(paths.styles, {
    style: 'compressed',
    // style: 'extended',
    sourcemap: true })
    .pipe(maps.write('../maps'))
    .pipe(gulp.dest('app/styles'));
  }
);
// Join and minify the scripts
gulp.task('scripts', function() {
  gulp.src(paths.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('scripts.js'))
  .pipe(uglify({ mangle: false }))
  .pipe(gulp.dest('app/scripts'));
});
// Minify images
gulp.task('images', function() {
  return gulp.src(paths.images)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('app/img'));
});
// Move json files
gulp.task('data', function() {
  gulp.src(paths.data)
    .pipe(gulp.dest('app/data'));
});
// Move template files
gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(minify())
    .pipe(gulp.dest('app/templates'));
});
// Watcher
gulp.task('watch',function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.data, ['data']);
});
// Default task: run agulpll at once
gulp.task('default', ['styles','scripts', 'images', 'data', 'templates', 'watch']);
