const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

sass.compiler = require('node-sass')

gulp.task('sass', function(done) {
  return gulp.src('sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'))
  done()
})

gulp.task('sass-mapped', function(done) {
  return gulp.src('sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
  done()
})

gulp.task('sass:watch', function(done) {
  gulp.watch(['sass/*.scss', '*.html'], gulp.series('sass-mapped'))
  done()
})