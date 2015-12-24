var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    tsc = require('gulp-typescript'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

// Task: copy html files
gulp.task('copy', function(){
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
});

// Task: compile typscript files
var tsp = tsc.createProject('tsconfig.json');
gulp.task('compile:typescript', function() {
	var result = tsp.src()
		.pipe(tsc(tsp));
	return result.js.pipe(gulp.dest('dist'));
});

// Task: compile javascript files with browserify
gulp.task('compile:browserify', ['compile:typescript'], function() {
    return browserify({ entries: ['dist/main.js'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

// Task: create dist folder for prod/standalone
gulp.task('build', [
    'copy',
    'compile:typescript',
    'compile:browserify'
]);