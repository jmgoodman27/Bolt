const gulp = require('gulp');
// Adds vendor prefixes automatically (uses http://caniuse.com/)
const autoprefixer = require('gulp-autoprefixer');
// Minifies CSS
const cleanCSS = require('gulp-clean-css');
// Removes unused CSS from stylesheet
const purify = require('gulp-purifycss');
// Lossless optimization on images
const imagemin = require('gulp-imagemin');
// Used to run Shell commands with Gulp
const exec = require('child_process').exec;
const readlineSync = require('readline-sync');
const git = require('gulp-git');

gulp.task('css', function () {
    return gulp.src('./docs/assets/css/style.css')
        .pipe(autoprefixer())
        .pipe(purify(['./docs/*.html']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./docs/assets/css/'));
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
gulp.task('serve', function(done) {
    exec('bundle exec jekyll serve').stdout.pipe(process.stdout);
    done();
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
