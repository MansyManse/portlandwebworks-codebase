var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// This function is to compile all the needed scss files into CSS and auto-inject it to the browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/font-awesome/scss/font-awesome.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// This function is to move the fonts files into our /src/fonts folder
gulp.task('fonts', function() {
    return gulp.src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest("src/fonts"))
        .pipe(browserSync.stream());
});

// This function is to move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});


gulp.task('watch', function() {
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/font-awesome/scss/font-awesome.scss', 'src/scss/*.scss'], gulp.series('sass'));
    gulp.watch("src/js/app.js").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// This function is to designate the scr folder to the Static Server and for watching changes in scss/html files
gulp.task('server', gulp.series('sass', function() {
    browserSync.init({
        server: "./"
    });
}));

gulp.task('default', gulp.parallel('server', 'fonts', 'js', 'watch'));