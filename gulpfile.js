import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import path from 'path';

const sassCompiler = gulpSass(sass);
const server = browserSync.create();

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img/'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  }
};

// Clean task
export function clean() {
  return deleteAsync(['dist/css/*', 'dist/js/*', 'dist/img/*','dist/**/*.html', 'dist/rev-manifest.json']);
}

// Styles task
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(rev())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rev.manifest({ path: 'rev-manifest-css.json', merge: true }))
    .pipe(gulp.dest('dist'))
    .pipe(server.stream());
}

// Scripts task
export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(rev())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rev.manifest({ path: 'rev-manifest-js.json', merge: true }))
    .pipe(gulp.dest('dist'));
}

// Images task
export function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

// Rev replace task
export function revReplaceFiles() {
  const manifest = gulp.src([path.join('dist', 'rev-manifest-css.json'), path.join('dist', 'rev-manifest-js.json')]);

  return gulp.src(paths.html.src)
    .pipe(revReplace({
      manifest: manifest,
      replaceInExtensions: ['.html']
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(server.stream());
}

// Serve task
function serve(done) {
  server.init({
    server: {
      baseDir: './dist'
    }
  });
  done();
}

// Reload task
function reload(done) {
  server.reload();
  done();
}

// Watch files task
export function watchFiles() {
  // gulp.watch(paths.styles.src, gulp.series(styles, revReplaceFiles));
  // gulp.watch(paths.scripts.src, gulp.series(scripts, revReplaceFiles, reload));
  gulp.watch(paths.styles.src, gulp.series(clean, styles, scripts, revReplaceFiles, reload));
  gulp.watch(paths.scripts.src, gulp.series(clean, scripts, styles, revReplaceFiles, reload));
  gulp.watch(paths.images.src, gulp.series(images, revReplaceFiles, reload));
  gulp.watch(paths.html.src, gulp.series(revReplaceFiles, reload));
}

// Build task
const build = gulp.series(clean, gulp.parallel(styles, scripts, images), revReplaceFiles);

// Watch task
const watch = gulp.series(build, serve, watchFiles);

export { build, watch, serve };
