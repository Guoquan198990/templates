// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    // imagemin = require('gulp-imagemin'),       //图片压缩
    less = require('gulp-less'),          //less
    minifycss = require('gulp-minify-css'),    //css压缩
    // jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),   //livereload
    $ = require('gulp-load-plugins')();

var path = require('path');

// 错误处理
var handler = function (err) {
    $.util.beep();
    $.util.log($.util.colors.red(err.name), err.message);
};

// 清除垃圾数据
gulp.task('clean', function (callback) {
    var del = require('del');
    del(['.tmp', 'dist'], callback);
});

gulp.task('html', function () {
  gulp.src(['src/*.html', 'src/templates/**/*.html'])
    .pipe(connect.reload());
});

// gulp.task('less', function () {
//     gulp.src(['src/styles/*.less'])
//         .pipe(less())
//         .pipe(gulp.dest('.tmp/styles'));
// });

// 样式
// gulp.task('styles', function () {
//   gulp.src(['src/styles/*.less'])
//     .pipe($.plumber({
//         errorHandler: handler
//     }))
//     .pipe($.less({
//         dumpLineNumbers: 'comments'
//     }))
//     .pipe($.plumber.stop())
//     .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest('.tmp/styles'))
//     .pipe(reloadPage())
//     .pipe($.size());
// });

gulp.task('less', function () {
    gulp.src(['src/styles/*.less']) //多个文件以数组形式传入
        .pipe(less())
        .pipe(gulp.dest('src/styles/css')) //将会在src/css下生成index.css以及detail.css 
        .pipe(connect.reload());
});

// Scripts Init
var scriptsInit = function (modulesPath) {
  var scriptText = '';
  fs.readdirSync(modulesPath).forEach(function (file) {
    if (file !== 'index.js' && file.indexOf('.js')>-1) {
        scriptText += 'require(\'./' + file.replace('.js', '') + '\');\n'
    }
  });

  var src = require('stream').Readable({
    objectMode: true
  });

  src._read = function () {
    this.push(new $.util.File({
        cwd: '',
        base: '',
        path: 'index.js',
        contents: new Buffer(scriptText)
    }));
    return this.push(null);
  };

  return src.pipe(gulp.dest(modulesPath));
};

// Scripts Modernizr
gulp.task('scripts:modernizr', function () {
  return gulp.src(['src/components/modernizr/modernizr.js'])
    .pipe($.modulizr([
        'cssclasses',
        'touch'
    ]))
    .pipe($.concat('modernizr.js'))
    .pipe(gulp.dest('.tmp/scripts/'))
    .pipe($.size());
});

// Scripts Ui Bootstrap Template
gulp.task('scripts:ui:template', function () {
  return gulp.src(config.angularUiTpls)
    .pipe($.html2js({
        outputModuleName: 'ui.bootstrap.tpls',
        base: 'src/components/angular-ui-bootstrap/'
    }))
    .pipe($.concat('template.js'))
    .pipe(gulp.dest('.tmp/scripts/'))
    .pipe($.size());
});

// Scripts Vendor
gulp.task('scripts:vendor', ['scripts:modernizr', 'scripts:ui:template'], function () {

  var files = config.vendors;
  files.push('src/scripts/config/env.js');
  return gulp.src(files)
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.js'))
    //.pipe($.ngmin())
    //.pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.size());
});

// Scripts Browserify
gulp.task('scripts:browserify', function () {
  gulp.src(['src/scripts/*.js'])
    // .pipe($.plumber({errorHandler: handler}))
    // .pipe($.browserify({debug: true}))
    // .pipe($.plumber.stop())
    //.pipe($.ngmin())
    //.pipe($.uglify())
    //.pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    // .pipe($.size())
    .pipe(connect.reload());
});

// Scripts
gulp.task('scripts', ['scripts:vendor', 'scripts:browserify']);

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch('src/styles/*.less', ['less']) //当所有less文件发生改变时，调用less任务
  gulp.watch(['src/scripts/**/*.js'], ['scripts:browserify']);
});

// Build Assets
gulp.task('build:assets', function () {
  return gulp.src(['src/*.{ico,png,txt,xml,bin}'])
    .pipe($['if']('*.js', $.uglify()))
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

// Build Fonts
gulp.task('build:fonts', function () {
  return gulp.src(['src/**/*.{eot,svg,ttf,woff,woff2}'])
    .pipe($.flatten())
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe($.size());
});

// Build Styles
gulp.task('build:styles', function () {
  return gulp.src(['src/styles/*.less'])
    .pipe($.less())
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(urlAdjuster({
        replace:  [/(\.\..*?|^)(?=fonts|images)/,'../']
    }))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

// Build Scripts
gulp.task('build:scripts', ['scripts:vendor', 'build:templates'], function () {
  return gulp.src(['src/scripts/*.js'])
    .pipe($.replace(/\/\*##(.+)##\*\//, '$1'))
    .pipe($.browserify())
    .pipe($.ngAnnotate())  //处理angular依赖
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.size());
});

// Build Images
gulp.task('build:images', function () {
  return gulp.src(['src/styles/images/**/*'])
    .pipe($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('.tmp/images'))
    .pipe($.size());
});

// Build Html
gulp.task('build:html', ['build:assets', 'build:fonts', 'build:styles', 'build:scripts', 'build:images'], function () {
  var assets = $.useref.assets({
      searchPath: ['.tmp', 'public']
  });

  return gulp.src(['.tmp/*.html'])
    .pipe($.replace("styles/images/","images/"))
    .pipe(assets)
    .pipe($['if']('*.css', $.csso()))
    .pipe($['if']('*.js', $.uglify()))
    .pipe(assets.restore())
    .pipe($.useref())

    .pipe($['if']('*.css', gulp.dest('.tmp/build')))
    .pipe($['if']('*.js', gulp.dest('.tmp/build')))
    .pipe($['if']('*.html', gulp.dest('dist')))
    .pipe($.size());
});



//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    root: 'src',
    livereload: true
  });
});

//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);