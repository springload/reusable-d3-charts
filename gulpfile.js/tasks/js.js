var gulp = require('gulp');
var config = require('../config');
var path = require('path');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var bs = require('browser-sync').get('main');

var prod = process.env.NODE_ENV === 'production';
var browserifyInstance = prod ? browserify : browserifyInc;

var bundler = browserifyInstance({
    cache: {},
    transform: [babelify],
    packageCache: {},
    debug: !prod,
    fullPaths: !prod
});

bundler.add(path.resolve(config.paths.jsSrc, config.paths.appName));

gulp.task('js', function() {
    return bundler.bundle()
        .on('error', function handleError(err) {
            gutil.log(err.message);
            bs.notify(err.message, 10000);
            this.emit('end');
        })
        .pipe(source(config.paths.appName))
        .pipe(buffer())
        .pipe(prod ? uglify() : gutil.noop())
        .pipe(gulp.dest(config.paths.js))
        .pipe(bs.stream());
});
