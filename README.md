# Gulp LESS Data

## Install
```sh
npm install gulp-less-data
```
## Usage

```javascript
var gulp = require("gulp");
var less = require("gulp-less");
var lessData = require("gulp-less-data")


gulp.src("test.less")
    .pipe(lessData({
        color: "red",
        bgcolor: "blue"
    }))
    .pipe(less())
    .pipe(gulp.dest("./dest"));
```

## TODO

Eh, need more? Forget it! 
