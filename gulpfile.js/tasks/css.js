// ----------------------------------------------------------------------------
// CSS
// ----------------------------------------------------------------------------

var config = require("../config");
var gulp = require('gulp');
var path = require('path');

var sass = require('gulp-sass');
var gutil = require('gulp-util');
var plz = require("gulp-pleeease");
var bs = require('browser-sync').get('main');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function() {
    return gulp.src(path.join( config.paths.sass, '**', "*.scss" ), {base: config.paths.sass})
        .pipe(config.prod ? gutil.noop() : sourcemaps.init())
            .pipe(sass())
            .on('error', function handleError(err) {
                gutil.log(err.message);
                bs.notify(err.message, 10000);
                this.emit('end');
            })
            .pipe(plz( config.PlzOptions ))
        .pipe(config.prod ? gutil.noop() : sourcemaps.write())
        .pipe(gulp.dest( config.paths.css ))
        .pipe(bs.stream());
});
