const gulp = require('gulp');

// CSS
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps')
const tailwindcss = require('tailwindcss');
const purgecss = require('gulp-purgecss')

// Lossless optimization on images
const imagemin = require('gulp-imagemin');

// Used to run Shell commands with Gulp
const exec = require('child_process').exec;
const readlineSync = require('readline-sync');
const git = require('gulp-git');

// Browsersync
const browserSync = require('browser-sync');

gulp.task('css', () => {
    return gulp.src('./tailwind/*.css')
      .pipe( sourcemaps.init() )
      .pipe( postcss([ 
          require('postcss-import'),
          tailwindcss('./tailwind/tailwind.js'),
        ]) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('./jekyll/assets/css/') )
  })

gulp.task('css-prod', () => {
    return gulp.src('./tailwind/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss([ 
        require('postcss-import'),
        tailwindcss('./tailwind/tailwind.js'),
        require('autoprefixer'),
        require('cssnano')
      ]) )
    .pipe(
        purgecss({content: ["./docs/**/*.html"]})
    )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./docs/assets/css/') )
})

gulp.task('watch-css', function() {
    gulp.watch('./tailwind/style.css', gulp.series('css'));
  });

// Compress images as end of build process
gulp.task('images', function() {
  return gulp.src('./docs/assets/img/*') //Get all images
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],

    })) //Run compression
    .pipe(gulp.dest("./docs/assets/img/"));
});

// Run Shell command from gulp
gulp.task('build', function(done) {
    exec('bundle exec jekyll build').stdout.pipe(process.stdout);
    done();
});

gulp.task('jekyll-serve', function(done) {
    exec('bundle exec jekyll serve');
    done();
});

// Serve with browsersync
gulp.task('browser-sync', function () {
    browserSync.init({server: {baseDir: './docs'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('docs/**/*.*').on('change', browserSync.reload);
});

gulp.task('default',  gulp.parallel('jekyll-serve', 'browser-sync', 'watch-css'));


// Prompt for Git commit message and push to master
gulp.task('git', function() {
    var message = readlineSync.question('Commit message: ');
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit(message))
        .on('end', function() {
            git.push('origin', 'master', function (err) {
              if (err) throw err;
            })
        });
});
