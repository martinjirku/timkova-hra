var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

var paths = {
    pages: ['src/*.html'],
    media: ['src/media/*', './node_modules/phaser/docs/img/phaser.png'],
    appRoot: ['src/main.ts'],
    phaser: ['./node_modules/phaser/build/phaser.js'],
    requirejs: ['./node_modules/requirejs/require.js'],
    dist: './dist'
};

gulp.task('default', ['browser-sync']);

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-phaser', function() {
    return gulp.src(paths.phaser)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-requirejs', function() {
    return gulp.src(paths.requirejs)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-media', function() {
    return gulp.src(paths.media)
        .pipe(gulp.dest(paths.dist + '/media'));
});

gulp.task('ts', function (cb) {
   exec('tsc', function (err, stdout, stderr) {
    console.log('Typescript:\n',stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('browser-sync', ['ts', 'copy-phaser', 'copy-media', 'copy-requirejs', 'copy-html'], function() {
    browserSync.init({
        server: {
            baseDir: './',
            fallback: 'index.html'
        }
    });
    gulp.watch('src/*.ts', ['ts']).on('change', browserSync.reload);
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/', ['copy-media']);
});