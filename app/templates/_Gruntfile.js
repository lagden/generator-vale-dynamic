"use strict";

var os = require('os');
var exec = require("child_process").exec;
var mountFolder = function(connect, dir) {
    return connect.static(require("path").resolve(dir));
};
var appUseJquery = <%= useJquery %>;
var appAddHtml5shiv = <%= addHtml5shiv %>;
var pathFinal = "<%= projectPath %>/<%= _.slugify(projectName) %>-1/";

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    var buildConfigMain = grunt.file.readJSON("tools/build.js");

    var dev = "dev",
        build = "build",
        pathDevDoc = dev + "/Documents/app",
        pathDevJs = pathDevDoc + "/js",
        pathDevCss = pathDevDoc + "/css";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            app: {
                src: [pathDevCss, build, pathDevDoc + "/*.html", pathDevDoc + "/*.txt"]
            }
        },
        jshint: {
            app: {
                files: {
                    src: [pathDevJs + "/**/*.js"]
                },
                options: {
                    ignores: [pathDevJs + "/lib/**/*"]
                }
            }
        },
        compass: {
            app: {
                options: {
                    config: "config.rb"
                }
            }
        },
        jade: {
            iframe: {
                options: {
                    compileDebug: true,
                    pretty: true,
                    data: {
                        path: "",
                        useJquery: appUseJquery,
                        addHtml5shiv: appAddHtml5shiv,
                        debug: false
                    }
                },
                files: {
                    "dev/Documents/app/index.html": ["jade/templates/index.jade"]
                }
            },
            txt: {
                options: {
                    pretty: true,
                    data: {
                        path: pathFinal,
                        useJquery: appUseJquery,
                        addHtml5shiv: appAddHtml5shiv,
                        debug: false
                    }
                },
                files: {
                    "dev/Documents/app/app.txt": ["jade/templates/body.jade"]
                }
            },
            server: {
                options: {
                    compileDebug: true,
                    pretty: true,
                    data: {
                        path: "/",
                        useJquery: appUseJquery,
                        addHtml5shiv: appAddHtml5shiv,
                        debug: true
                    }
                },
                files: {
                    "dev/Documents/app/server.html": ["jade/templates/index.jade"]
                }
            }
        },
        watch: {
            sass: {
                files: ["sass/**/*.scss"],
                tasks: ["compass"],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: [pathDevDoc + "/js/**/*.js"],
                tasks: ["jshint:dev"],
                options: {
                    interrupt: true
                }
            },
            jade: {
                files: ["jade/templates/**/*.jade"],
                tasks: ["jade:server"],
                options: {
                    interrupt: true
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: <%= projectLocalServerPort %>,
                    hostname: '0.0.0.0',
                    middleware: function(connect) {
                        return [
                            require('connect-livereload')(),
                            mountFolder(connect, pathDevDoc)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: "http://localhost:<%= projectLocalServerPort %>/server.html"
            }
        }
    });

    grunt.registerTask(
        "requirejs",
        "Run the r.js build script",
        function() {
            var done = this.async();
            var command = (os.platform() == "win32") ? "r.js.cmd" : "r.js";
            exec(command + " -o ./tools/build.js",
                function(err, stdout, stderr) {
                    if (err) {
                        grunt.fail.fatal("Problem with r.js: " + err + " " + stderr);
                    }
                    grunt.log.writeln(stdout);
                    grunt.log.ok("Build complete.");
                    done();
                }
            );
        }
    );
    grunt.registerTask("default", ["clean", "compass", "jade", "jshint:app"]);
    grunt.registerTask("server", ["default", "connect", "open", "watch"]);
    grunt.registerTask("build", ["default", "requirejs"]);
};