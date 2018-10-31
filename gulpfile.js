//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'), //less编译
    cssmin = require('gulp-clean-css'), //css压缩
    jsmin = require('gulp-uglify'), //js压缩
    imagemin = require('gulp-imagemin'), //图片压缩
    concat = require('gulp-concat'), //合并文件
    rename = require("gulp-rename"); //文件重命名
 
/* 定义一个Less编译任务 */
gulp.task('Less', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('css')); //将会在css下生成index.css
});
 
/* css压缩任务 */
gulp.task('minCss', function () {
    gulp.src('src/css/index.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});
 
/* js压缩合并任务 */
gulp.task('minJs', function () {
    gulp.src('src/js/*.js')
        .pipe(jsmin())
        .pipe(concat('all.js')) //合并后的文件名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

/* 图片压缩任务 */
gulp.task('minImage',function () {
    gulp.src('src/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
})
 
/* 监听css文件，当css/下所有css文件发生改变时，调用minCss任务 */
gulp.task('WatchCss', function () {
    gulp.watch('src/css/*.css', ['minCss']);
});
 
/* 监听less文件，当less下所有的less文件发生改变时，调用Less任务 */
gulp.task('WatchLess', function () {
    gulp.watch('src/less/*.less', ['Less']); //当所有less文件发生改变时，调用testLess任务
});
 
/* 监听js文件，当js下所有的js文件发生改变时，调用minJs任务 */
gulp.task('WatchJs', function () {
    gulp.watch('src/js/*.js', ['minJs']); //当所有less文件发生改变时，调用testLess任务
});

/* 监听images文件，当images下所有的images文件发生改变时，调用minImage任务 */
gulp.task('WatchImage', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('src/images/*.*)', ['minImage']);
});

gulp.task('default',['Less','WatchLess','minCss','WatchCss','minJs','WatchJs','minImage','WatchImage']); //定义默认任务   只需要开启默认任务就可以