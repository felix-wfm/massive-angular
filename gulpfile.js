var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    del = require('del'),
    karma = require('karma');

var port = '3000',
    env = process.env.NODE_ENV || 'dev',
    configFile = './app/config/config.' + env + '.js';

var paths = {
    dev: './public',								// development folder
    release: './release',							// release folder
    app: {
        templates: [
            './app/assets/template/**/*.html',		// included html files
            '!./app/assets/template/**/_*.html'     // excluded html files
        ],
        styles: [
            './app/assets/css/**/*.css',			// included css files
            '!./app/assets/css/**/_*.css',			// excluded css files
            './app/assets/css/**/*.less',			// included less files
            '!./app/assets/css/**/_*.less'			// excluded less files
        ],
        images: [
            './app/assets/img/**/*'					// included images
        ],
        scripts: [
            configFile,								// configuration file path
            './app/assets/js/**/*.js',				// included js files
            '!./app/assets/js/**/_*.js'				// excluded js files
        ],
        tests: [
            './tests/**/*.js',					    // included test files
            '!./tests/**/_*.js'					    // excluded test files
        ],
        data: [
            './tests/data/**/*.json',				// included data files
            '!./tests/data/**/_*.json'              // excluded data files
        ]
    },
    vendor: {
        styles: [
            './bower_components/font-awesome/css/font-awesome.css',
            './bower_components/bootstrap/dist/css/bootstrap.css',
            './bower_components/angular/angular-csp.css',
            './bower_components/highlightjs/styles/github.css'
        ],
        fonts: [
            './bower_components/font-awesome/fonts/*',
            './bower_components/bootstrap/dist/fonts/*'
        ],
        images: [],
        scripts: [
            './bower_components/jquery/dist/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './bower_components/angular/angular.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js',
            './bower_components/highlightjs/highlight.pack.js',
            './bower_components/angular-highlightjs/angular-highlightjs.js',
            './bower_components/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js'
        ]
    }
};

gulp.task('app.templates', function () {
    return gulp.src(paths.app.templates)
        .pipe(gulp.dest(paths.dev))
        .pipe(connect.reload());
});

gulp.task('app.styles', function () {
    return gulp.src(paths.app.styles)
        .pipe(less())
        .pipe(concat('application.css'))
        .pipe(gulp.dest(paths.dev + '/css'))
        .pipe(connect.reload());
});

gulp.task('app.images', function () {
    return gulp.src(paths.app.images)
        .pipe(gulp.dest(paths.dev + '/img'))
        .pipe(connect.reload());
});

gulp.task('app.scripts', function () {
    return gulp.src(paths.app.scripts)
        .pipe(concat('application.js'))
        .pipe(gulp.dest(paths.dev + '/js'))
        .pipe(connect.reload());
});

gulp.task('app.data', function () {
    return gulp.src(paths.app.data)
        .pipe(gulp.dest(paths.dev + '/api'))
        .pipe(connect.reload());
});

gulp.task('vendor.styles', function () {
    return gulp.src(paths.vendor.styles)
        .pipe(less())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.dev + '/css'));
});

gulp.task('vendor.fonts', function () {
    return gulp.src(paths.vendor.fonts)
        .pipe(gulp.dest(paths.dev + '/fonts'));
});

gulp.task('vendor.images', function () {
    return gulp.src(paths.vendor.images)
        .pipe(gulp.dest(paths.dev + '/img'));
});

gulp.task('vendor.scripts', function () {
    return gulp.src(paths.vendor.scripts)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.dev + '/js'));
});

gulp.task('dev.clean', function (cb) {
    del([paths.dev + '/*'], cb);
});

gulp.task('dev.build', ['dev.clean'], function () {
    gulp.start(
        'app.templates', 'app.styles', 'app.images', 'app.scripts', 'app.data',
        'vendor.styles', 'vendor.fonts', 'vendor.images', 'vendor.scripts'
    );
});

gulp.task('dev.watch', function () {
    gulp.watch(paths.app.templates, ['app.templates']);
    gulp.watch(paths.app.styles, ['app.styles']);
    gulp.watch(paths.app.images, ['app.images']);
    gulp.watch(paths.app.scripts, ['app.scripts']);
    gulp.watch(paths.app.data, ['app.data']);
});

gulp.task('dev', ['dev.build'], function () {
    gulp.start('dev.watch');

    connect.server({
        port: port,
        root: paths.dev,
        livereload: true
    });
});

gulp.task('release.clean', function (cb) {
    del([paths.release + '/*'], cb);
});

gulp.task('release.build', ['release.clean'], function () {
    gulp.src(paths.app.templates)
        .pipe(gulp.dest(paths.release));

    gulp.src(paths.app.styles)
        .pipe(less())
        .pipe(concat('application.css'))
        .pipe(csso())
        .pipe(gulp.dest(paths.release + '/css'));

    gulp.src(paths.vendor.styles)
        .pipe(less())
        .pipe(concat('vendor.css'))
        .pipe(csso())
        .pipe(gulp.dest(paths.release + '/css'));

    gulp.src(paths.vendor.fonts)
        .pipe(gulp.dest(paths.release + '/fonts'));

    gulp.src(paths.app.images)
        .pipe(gulp.dest(paths.release + '/img'));

    gulp.src(paths.vendor.images)
        .pipe(gulp.dest(paths.release + '/img'));

    gulp.src(paths.app.scripts)
        .pipe(concat('application.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.release + '/js'));

    gulp.src(paths.vendor.scripts)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.release + '/js'));

    gulp.src(paths.app.data)
        .pipe(gulp.dest(paths.release + '/api'));
});

gulp.task('release', function () {
    gulp.start('release.build');
});

gulp.task('test', function () {
    var server = new karma.Server({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    });

    server.start();
});

gulp.task('test.run', function () {
    var server = new karma.Server({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: false
    });

    server.start();
});
