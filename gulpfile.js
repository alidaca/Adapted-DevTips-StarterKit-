var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var jade        = require('gulp-jade');



/** 
* Configure browser-sync to load files from build directory
**/

gulp.task('browser-sync', function(){
    browserSync.init({
    server: {
        baseDir: "./build"
    }
    });
});

/**
 * Compile files from jade into build
 */
gulp.task('jade', function(){
  return gulp.src('source/jadeFiles/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build'))
  .pipe(browserSync.reload({stream:true}));;
});


/**
 * Compile files from sass into build
 */
 gulp.task('sass', function () {
     return gulp.src('source/assets/css/main.sass')
         .pipe(sass({
             includePaths: ['css'],
             onError: browserSync.notify
         }))
         .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
         .pipe(gulp.dest('./build/assets/css'))
         .pipe(browserSync.reload({stream:true}));
 });

 gulp.task('javascript', function(){
   return gulp.src('source/assets/js/*.js')
   .pipe(gulp.dest('./build/assets/js'))
   .pipe(browserSync.reload({stream:true}));;
 });

/**
 * Watch sass files for changes & recompile
 * Watch jade files for changes and recompile
 * Watch html/md files & reload BrowserSync

 */
 gulp.task('watch', function () {
     gulp.watch('source/assets/css/**', ['sass']);
     gulp.watch(['source/jadeFiles/*.jade'], ['jade']);
     gulp.watch(['source/assets/js/*.js'], ['javascript']);
     gulp.watch('/build/*.html').on('change', browserSync.reload);
 });

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
