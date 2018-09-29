const gulp = require('gulp');

// CSS
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps')
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss')

// Lossless optimization on images
const imagemin = require('gulp-imagemin');

// Used to run Shell commands with Gulp
const exec = require('child_process').exec;
const readlineSync = require('readline-sync');
const git = require('gulp-git');

// Cleans
const del = require('del');

// Browsersync
const browserSync = require('browser-sync');

gulp.task('css', () => {
    return gulp.src('./src/css/style.css')
      .pipe( sourcemaps.init() )
      .pipe( postcss([ 
        require('postcss-import'),
        tailwindcss('./src/css/tailwind.js'),
        ]))
      .pipe( sourcemaps.write('.') )
      .pipe(gulp.dest('./jekyll/assets/css/'))
  })

gulp.task('css-prod', () => {
    return gulp.src('./src/css/style.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss([ 
        require('postcss-import'),
        tailwindcss('./src/css/tailwind.js'),
        require('autoprefixer'),
        purgecss({
            content: ['./dist/**/*.html']
          }),
        require('cssnano'),
      ]) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./dist/assets/css/') )
})

gulp.task('watch-css', function() {
    gulp.watch('./src/css/*.*', gulp.series('css'));
});

gulp.task('watch-js', function() {
    gulp.watch('./src/js/index.js', gulp.series('bundle'));
});

gulp.task('images', function() {
  return gulp.src('./dist/assets/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],

    })) //Run compression
    .pipe(gulp.dest("./dist/assets/img/"));
});

// Trigger webpack bundle
gulp.task('bundle', function(cb) {
    exec('npm run dev', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
});

// Trigger webpack bundle for production
gulp.task('bundle-prod', function(cb) {
    exec('npm run build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
});

// Run Shell command from gulp
gulp.task('jekyll-build', function(cb) {
    exec('bundle exec jekyll build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
});

gulp.task('jekyll-serve', function(cb) {
    exec('bundle exec jekyll serve', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
});

// Serve with browsersync
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {baseDir: './dist'},
        notify:false
    });
    // Reloads page when some of the already built files changed:
    gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('default',
    gulp.series('jekyll-build', 'css', 'bundle', gulp.parallel('jekyll-serve', 'browser-sync', 'watch-css', 'watch-js'))
);

// Clean for production
gulp.task('clean-dist', function () {
    return del([
        'dist/**/*.*'
      ]);
});

// Clean CSS and JS folders
gulp.task('clean-assets', function () {
    return del([
        'dist/assets/js/*.*',
        'dist/assets/css/*.*'
      ]);
});

gulp.task('production', gulp.series('clean-dist', 'jekyll-build', 'clean-assets','css-prod', 'bundle-prod'));


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
