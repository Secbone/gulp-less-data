var gulp = require("gulp");
var less = require("gulp-less");
var lessData = require("../index.js");

gulp.task("test", function() {
    gulp.src("test.less")
        .pipe(lessData({
            color: "red",
            bgcolor: "blue"
        }))
        .pipe(less())
        .pipe(gulp.dest("./dest"));
});
