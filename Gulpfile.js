'use strict';

// imports

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    usemin = require('gulp-usemin'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    ngHtml2Js = require('gulp-ng-html2js'),
    uglifyJs = require('gulp-uglify'),
    replace = require('gulp-replace'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip');

var dependencies = require('./package.json').dependencies;

// build settings

var PATHS = {
    dist: 'build/',
    dist_public: 'build/public/',
    src: ['dev/public/scripts/**/*.js'],
    app: 'dev/public/index.html'
};


gulp.task('build-server', ['clean-server', 'copy-dependencies', 'copy-server']);
gulp.task('build-client', ['clean-client', 'templates', 'compress', 'assets']);
gulp.task('build', ['clean-all', 'build-server', 'build-client']);

/* shared tasks */

gulp.task('clean-all', function () {
    return gulp
        .src(PATHS.dist, {read: false})
        .pipe(clean());
});


gulp.task('freeze', function () {
    var filename = [Date.now(), 'goldbin.tar'].join('-');

    return gulp.src('build/**/*')
        .pipe(tar(filename))
        .pipe(gzip())
        .pipe(gulp.dest('/tmp'));
});
/* tasks for building the client */

gulp.task('clean-client', function () {
//    return gulp
//        .src([PATHS.dist + '/public/**/*'])
//        .pipe(clean());
});

gulp.task('assets', ['clean-client'], function () {
    gulp.src('dev/public/assets/{fonts,images}/**/*', {base: 'dev/public/'})
        .pipe(gulp.dest(PATHS.dist_public));
});

gulp.task('usemin', ['clean-client'], function () {
    return gulp.src(PATHS.app)
        .pipe(replace('<!-- gulp:goldbin:templates -->', '<script src="scripts/goldbin.templates.js"></script>'))
        .pipe(usemin({
            css: [minifyCss()]
        }))
        .pipe(gulp.dest(PATHS.dist_public));
});

gulp.task('compress', ['usemin'], function () {
    gulp.src(PATHS.dist_public + '**/*.js')
        .pipe(uglifyJs())
        .pipe(gulp.dest(PATHS.dist_public));
});

gulp.task('templates', ['clean-client'], function () {

    var scriptsPath = [PATHS.dist_public, '/scripts'].join('');

    return gulp.src('dev/public/scripts/goldbin/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'templates',
            prefix: 'scripts/goldbin/'
        }))
        .pipe(uglifyJs())
        .pipe(concat('goldbin.templates.js'))
        .pipe(gulp.dest(scriptsPath));

});

/* tasks for building the server */
gulp.task('clean-server', function () {
//    return gulp
//        .src('!' + PATHS.dist + '/public/**/*')
//        .pipe(clean());
});

gulp.task('copy-dependencies', ['clean-server'], function () {
    var scriptsPath = PATHS.dist;
    var base = 'node_modules/';
    var whitelist = Object.keys(dependencies).map(function(npm) {
        return [base, npm, '**', '*'].join('/');
    });

    gulp.src('package.json')
        .pipe(gulp.dest(scriptsPath));

    return gulp.src(whitelist, {base: '.'})
        .pipe(gulp.dest(scriptsPath));
});

gulp.task('copy-server', ['copy-dependencies'], function () {
    var scriptsPath = PATHS.dist;
    var sources = [
        'dev/app/**/*',
        'dev/config/**/*',
        'dev/server.js'
    ];

    return gulp.src(sources, {base: './dev'})
        .pipe(gulp.dest(scriptsPath))
});



