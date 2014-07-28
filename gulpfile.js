'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	map = require('map-stream'),
	symlink = require('gulp-symlink');

gulp.task('lint', function () {
	return gulp.src('app/scripts/**/*.js')
    	.pipe(jshint('.jshintrc'))
    	.pipe(jshint.reporter('jshint-stylish'))
    	.pipe(errorReporter());
});

gulp.task('hook', function () {
	return gulp.src('.pre-commit')
		.pipe(symlink('.git/hooks/', 'pre-commit'));
});

var errorReporter = function () {
	return map(function (file, cb) {
		if (!file.jshint.success) {
			process.exit(1);
		}
		cb(null, file);
	});
};
