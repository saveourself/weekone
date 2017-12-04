var gulp=require("gulp");
var webserver=require("gulp-webserver");
var url=require("url");
var fs=require("fs");
var path=require("path");
var ziphtml=require("gulp-htmlmin");
var zipcss=require("gulp-minify-css");
var zipjs=require("gulp-uglify")

gulp.task("webserver",function(){
    gulp.src('.').pipe(webserver({
        port:8888,
        middleware:function(req,res,next){
            var obj=url.parse(req.url)
            var pathname=obj.pathname;
            if(pathname==="/"){
                res.end(fs.readFileSync(path.join(__dirname,"index.html")))
            }else if(pathname==="/getdata"){
                res.end(fs.readFileSync(path.join(__dirname,"data.json")))
            }else{
                next();
            }

        }
    }))
})

gulp.task("ziphtml",function(){
    gulp.src("./*html").pipe(ziphtml({
        removeComments:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        minifyCSS:true,
        minifyJS:true,
        collapseWhitespace:true
    }))
    .pipe(gulp.dest("./html/"))
})
gulp.task("zipcss",function(){
    gulp.src("./*.css").pipe(zipcss()).pipe(gulp.dest("./css/"))
})
gulp.task("zipjs",function(){
    gulp.src("./*.js").pipe(zipjs()).pipe(gulp.dest("./js/"))
})
gulp.task("default",["webserver","ziphtml","zipcss","zipjs"])