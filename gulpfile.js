var gulp=require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var runSequence = require('run-sequence');
var browser = require("browser-sync").create();
var source = require('vinyl-source-stream');
var browserify=require("browserify");


gulp.task("browserSync", function() {
  browser.init({
    server:true,
    open:true
  });
});
gulp.task("sass", function() {
  gulp.src("./*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("./"))
    .pipe(browser.stream());
});
gulp.task("browserify",function(){
  browserify("main.js").bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./"))
    .pipe(browser.stream());
});
gulp.task("watch", function() {
  gulp.watch("./*.scss",["sass"]);
  gulp.watch("index.html", browser.reload);
  gulp.watch(['main.js'], ['browserify']);
  
});
gulp.task("default", function(cb) {
  return runSequence(
    ['sass','browserSync','browserify'],
    'watch',
    cb
  );
  
});
//"$ gulp" to run "default" task
