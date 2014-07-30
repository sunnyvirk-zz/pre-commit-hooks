'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var shell = require('gulp-shell');
var jscs = require('gulp-jscs');

// errorReport helper function
// returns 1 if a error is found
var errorReporter = function () {
    return map(function (file, cb) {
        if (file.jshint) {
            if (!file.jshint.success) {
                process.exit(1);
            }
        }
        cb(null, file);
    });
};

// lint task to check all script files
// use .jshintrc and jshint-stylish
// and error Reporter
gulp.task('lint', function () {
    return gulp.src('**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs())
        .pipe(errorReporter());
});

// make hook file's executable and symlink hook files to .git/hooks
gulp.task('hook', shell.task([
    'chmod +x hooks/*; cd .git/hooks && ln -sf ../../hooks/* .'
]));

var paths = {
    scss: 'app/scss/'
};

gulp.task('scss-lint', shell.task([
    'scss-lint ' + paths.scss + ' -c .scss-lint.yml'
]));
