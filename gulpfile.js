var gulp = require('gulp');
// Adds vendor prefixes automatically (uses http://caniuse.com/)
var autoprefixer = require('gulp-autoprefixer');
// Minifies CSS
let cleanCSS = require('gulp-clean-css');
// Needed to use Uncss
var postcss = require('gulp-postcss');
// Removes unused CSS from stylesheet
var uncss = require('postcss-uncss');
// Lossless optimization on images
var imagemin = require('gulp-imagemin');
// Runs gulp tasks one at a time
var runSequence = require('run-sequence');
// Used to run Shell commands with Gulp
var exec = require('child_process').exec;
var readlineSync = require('readline-sync');
var git = require('gulp-git');


// Minify, autoprefix, uncss
gulp.task('css', function () {
    var plugins = [
       uncss({ html: ['docs/**/*.html']})
   ];
    return gulp.src('docs/assets/css/style.css')
        .pipe(autoprefixer())
        .pipe(postcss(plugins))
        .pipe(cleanCSS())
        .pipe(gulp.dest('docs/assets/css/'));
});

// Image compression task on images in /Jekyll
gulp.task('images', function() {
  return gulp.src('jekyll/assets/img/*', {base: "./"}) //Get all images
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],

    })) //Run compression
    .pipe(gulp.dest("."));
});

// Run Shell command from gulp
gulp.task('build', function() {
    exec('bundle exec jekyll build').stdout.pipe(process.stdout);
});
gulp.task('default', function() {
    exec('bundle exec jekyll serve').stdout.pipe(process.stdout);
});

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
