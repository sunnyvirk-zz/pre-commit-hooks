'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	map = require('map-stream'),
	shell = require('gulp-shell');


// lint task to check all script files
// use .jshintrc and jshint-stylish
// and error Reporter
gulp.task('lint', function () {
	return gulp.src('app/scripts/**/*.js')
    	.pipe(jshint('.jshintrc'))
    	.pipe(jshint.reporter('jshint-stylish'))
    	.pipe(errorReporter());
});

// make hook file's executable and symlink hook files to .git/hooks
gulp.task('hook', shell.task([
	'chmod +x hooks/*; cd .git/hooks && ln -sf ../../hooks/* .'
]))

// errorReport helper function
// returns 1 if a error is found
var errorReporter = function () {
	return map(function (file, cb) {
		if (!file.jshint.success) {
			process.exit(1);
		}
		cb(null, file);
	});
};
