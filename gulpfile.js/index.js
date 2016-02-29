require('./tasks/watch');
require('./tasks/css');
require('./tasks/js');

var gulp = require('gulp');

gulp.task('build', ['js', 'css']);

gulp.task('default', ['build']);
