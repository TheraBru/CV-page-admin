// Declare constants of the project
const{src, dest, watch, series, parallel} = require("gulp");
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('node-sass'));
const sourcemaps = require('gulp-sourcemaps');

// Declares search paths to files
const files={
    htmlPath: "src/**/*.html",
    scssPath: "src/scss/*.scss",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*",
}

// Task to change and move HTML-files
function copyHTML(){
    return src(files.htmlPath)
    .pipe(dest('pub'))
};

// Task to change and move images
function copyImg(){
    return src(files.imagePath)
    .pipe(dest('pub/images'))
};


// Task to change SCSS files to CSS and move them
function copySCSS(){
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('pub/css'))
};

//Task to change and move Javascript-files
function copyJS(){
    return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(dest('pub/js'))
};


// Watch task to make changes automatic
function watchChanges(){
    watch([files.htmlPath, files.imagePath, files.scssPath, files.jsPath], parallel(copyHTML, copyImg, copySCSS, copyJS));
}

// Exporting the files
exports.default = series(
    parallel(copyHTML, copyImg, copySCSS, copyJS),
    watchChanges
    );
