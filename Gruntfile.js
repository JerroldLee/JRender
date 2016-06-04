var setting={};
var concat=setting.concat={};
var uglify=setting.uglify={};

concat.src=["src/base.js","src/business.js","src/render_class.js"];
concat.dest="./dest/JRender.js";


uglify.src=concat.dest,uglify.dest="./dest/JRender.min.js";


module.exports = function (grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            concat: {
                options: {
                    separator:";\n",
                    footer:"\ngbl.JRender=JRender;\n})(window)",
                    banner:"(function(gbl){\n",
                    stripBanners:true,
                 process: function(src, filepath) {
                    return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '');
                }
                },
               
                dist: {
                    src: concat.src,
                    dest:concat.dest
                }
            },
            uglify: {
                options: {
                    banner: "//min.js\n",
                    mangle: false
                },
                build: {
                    src: uglify.src,
                    dest:uglify.dest
                }
            },
            cssmin: {
                options: {
                    //shorthandCompacting: false,
                    //roundingPrecision: -1
                },
                target: {

                    files: {
                        'output.css': ['public/src/a.css', 'public/src/b.css']

                    }
                }
            },
            jshint: {
                options: {
                    //如下为输出报表位置
                    reporterOutput: "public/out.js",
                    Type: String
                },
                all: ['Gruntfile.js', "public/src/b.js", "public/src/a.js"]
            }
        }
    )
    ;




    //usemin

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    // grunt.loadNpmTasks('grunt-contrib-cssmin');




    grunt.registerTask("ya", ["uglify"]);
    grunt.registerTask("cat", ["concat"]);
    grunt.registerTask("hint", ["jshint"]);

}
