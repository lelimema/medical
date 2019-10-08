var gulp        = require('gulp');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var streamqueue  = require('streamqueue');

// copy all HTML files
gulp.task('copyHtml', function (){
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

// Run:
// gulp copy-assets.
// Copy all needed dependency assets files into theme root.
gulp.task( 'copy-assets', function() {

    // Bootstrap 4
    var stream = gulp.src('./node_modules/bootstrap/dist/js/**/*.js' )
        .pipe( gulp.dest('./src/bootstrap4/js' ) );
    var stream = gulp.src('./node_modules/bootstrap/scss/**/*.scss' )
        .pipe( gulp.dest('./src/bootstrap4/scss' ) );

    // Font Awesome
    var stream = gulp.src('./node_modules/@fortawesome/fontawesome-free/js/**/*.js' )
        .pipe( gulp.dest('./src/fontawesome/js' ) );
    var stream = gulp.src('./node_modules/@fortawesome/fontawesome-free/scss/**/*.scss' )
        .pipe( gulp.dest('./src/fontawesome/scss' ) );
    var stream = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*' )
        .pipe( gulp.dest('./src/fontawesome/webfonts' ) );

    // Pushy Css
    var stream = gulp.src('./node_modules/@cmyee/pushy/js/**/pushy.js' )
        .pipe( gulp.dest('./src/pushy/js' ) );
    var stream = gulp.src('./node_modules/@cmyee/pushy/scss/**/pushy.scss' )
        .pipe( gulp.dest('./src/pushy/scss' ) );

});

// gulp sass
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// gulp scripts
// minify and concat all JS files into one
gulp.task('scripts', function(){
    return streamqueue({ objectMode: true },
        gulp.src('js/**/*.js'),
        gulp.src('src/bootstrap4/js/bootstrap.js'),
        gulp.src('src/pushy/js/pushy.js')
    )
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// gulp watch
// watcher runs gulp sass task on changes
gulp.task('watch', function () {

    // watch sass file
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));

    // watch scripts file
    gulp.watch('./js/**/*.js', gulp.series('scripts'));
});
