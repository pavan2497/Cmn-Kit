// package vars
const prj = require("./project.json");

const $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"]
});

var gulp = require('gulp');
var merge = require('merge-stream');
var del = require('del');
var fs = require('fs');
var watch = require('gulp-watch');

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);

gulp.task("css", () => {
  log("-> Building client app css dev");

  return gulp.src(prj.vendor.css.concat(prj.app.css))
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.newer({
      dest: prj.dist.css + 'style.css'
    }))
    .pipe($.sourcemaps.init({
      loadMaps: true
    }))
    .pipe($.concat('style.css'))
    .pipe($.sourcemaps.write("./"))
    .pipe(gulp.dest(prj.dist.css))
    .pipe($.browserSync.reload({
      stream: true
    }));
});

gulp.task("sass", () => {
  log("-> Compiling sass");

  return gulp.src(prj.app.sass)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.sourcemaps.init({
      loadMaps: true
    }))
    .pipe($.sass({
        includePaths: prj.vendor.sass
      })
      .on("error", $.sass.logError))
    .pipe($.cached("sass_compile"))
    .pipe($.autoprefixer())
    .pipe($.rename("app.css"))
    .pipe($.sourcemaps.write("./"))
    .pipe(gulp.dest(prj.dist.css))
    .pipe($.browserSync.reload({
      stream: true
    }));
});

var readTemplateData = function () {
  var data = {},
    dir = './app/data/';
  fs.readdirSync(dir).forEach(function (file) {
    delete require.cache[require.resolve(dir + file)]
    data[file.replace(/\.json$/, '')] = require(dir + file);
  });

  return data;
};

gulp.task('nunjucks', function () {

  log("-> Compiling nunjucks templates");

  return gulp.src('app/pages/**/*.+(html|nunjucks)')
    .pipe($.data(readTemplateData()))
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.nunjucksRender({
      path: ['app/templates']
    }))
    .pipe($.jsbeautifier({
      indent_size: 2,
      indent_char: ' '
    }))
    .pipe($.removeEmptyLines())
    .pipe(gulp.dest('dist'))
    .pipe($.browserSync.reload({
      stream: true
    }));
});

gulp.task('fonts', function () {
  log("-> Coping fonts");

  return gulp.src(prj.vendor.fonts.concat(prj.app.fonts))
    .pipe(gulp.dest(prj.dist.fonts))
    .pipe($.browserSync.reload({
      stream: true
    }));
});

gulp.task('img', function () {
  log("-> Coping images");

  return gulp.src(prj.vendor.img.concat(prj.app.img))
    .pipe(gulp.dest(prj.dist.img))
    .pipe($.browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function () {
  log("-> Building js");

  return gulp.src(prj.vendor.js.concat(prj.app.js))
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(prj.dist.js))
    .pipe($.browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function () {
  $.browserSync({
    server: {
      baseDir: 'dist'
    }
  })
});

/**
 * Remove all js and html from the `dist` folder.
 */
gulp.task('clean', function (cb) {
  log("-> Cleaning dist folder");

  return del(['./dist'], cb);
});

gulp.task('default', gulp.parallel('css', 'sass', 'nunjucks', 'js', 'fonts', 'img'));

gulp.task('watch', gulp.parallel('browserSync', 'default', function () {
  gulp.watch('assets/css/**/*', gulp.parallel('css'));
  gulp.watch('assets/sass/**/*', gulp.parallel('sass'));
  gulp.watch('app/**/*', gulp.parallel('nunjucks'));
  //gulp.watch(prj.app.js, ['js']);
  watch(prj.app.js, function() {gulp.start('js');});
  watch(prj.app.fonts, function() {gulp.start('fonts');});
  watch(prj.app.img, function() {gulp.start('img');});
}));


/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
const log = (msg) => {
  $.fancyLog($.chalk.blue(msg));
}

const onError = (err) => {
  $.fancyLog($.chalk.red(err));
};

/**
 * W3C Markup Validation
 */
gulp.task('w3cjs', function () {
	gulp.src('dist/*.html')
		.pipe($.w3cjs())
		.pipe($.w3cjs.reporter());
});

gulp.task('accessibility', function() {
  return gulp.src('./dist/*.html')
    .pipe($.accessibility({
      force: true
    }))
    .on('error', onError)
    .pipe($.accessibility.report({reportType: 'txt'}))
    .pipe($.rename({
      extname: '.txt'
    }))
    .pipe(gulp.dest('dist/reports'));
});
