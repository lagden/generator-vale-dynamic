'use strict';

var os = require('os'),
    exec = require('child_process').exec,
    appUseJquery = <%= useJquery %>,
    appAddHtml5shiv = <%= addHtml5shiv %>,
    pathFinal = '<%= projectPath %>/<%= _.slugify(projectName) %>-1/';

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    var buildConfigMain = grunt.file.readJSON('tools/build.js'),
        dev = 'dev/',
        build = 'build/',
        pathBuildDoc = build + 'Documents/app/',
        pathDevDoc = dev + 'Documents/app/',
        pathDevJs = pathDevDoc + 'js/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            app: {
                src: [build, pathDevDoc + '*.html', pathDevDoc + '*.txt']
            }
        },
        jshint: {
            app: {
                files: {
                    src: [pathDevJs + '**/*.js']
                },
                options: {
                    jshintrc: '.jshintrc',
                    ignores: [pathDevJs + 'lib.*']
                }
            }
        },
        compass: {
            app: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        jade: {
            iframe: {
                options: {
                    pretty: true,
                    data: {
                        path: '',
                        useJquery: appUseJquery,
                        addHtml5shiv: appAddHtml5shiv,
                        debug: false
                    }
                },
                files: {
                    'dev/Documents/app/iframe.html': ['jade/templates/index.jade']
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
                    'dev/Documents/app/app.txt': ['jade/templates/body.jade']
                }
            },
            server: {
                options: {
                    compileDebug: true,
                    pretty: true,
                    data: {
                        path: '/',
                        useJquery: appUseJquery,
                        addHtml5shiv: appAddHtml5shiv,
                        debug: true
                    }
                },
                files: {
                    'dev/Documents/app/server.html': ['jade/templates/index.jade']
                }
            }
        },
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['compass']
            },
            css: {
                files: [pathDevDoc + '**/*.css'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: [pathDevDoc + 'js/**/*.js'],
                tasks: ['jshint:app'],
                options: {
                    interrupt: true
                }
            },
            jade: {
                files: ['jade/templates/**/*.jade', 'db/**/*.json'],
                tasks: ['jade:server'],
                options: {
                    interrupt: true
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: <%= projectLocalServerPort %>,
                    hostname: '*',
                    keepalive: false,
                    livereload: true,
                    debug: true,
                    base: pathDevDoc,
                    open: 'http://localhost:<%= connect.dev.options.port %>/server.html'
                }
            },
            build: {
                options: {
                    port: <%= projectLocalServerPort %>,
                    hostname: '*',
                    keepalive: true,
                    livereload: false,
                    debug: false,
                    base: pathBuildDoc,
                    open: 'http://localhost:<%= connect.build.options.port %>/server.html'
                }
            }
        }
    });

    grunt.registerTask(
        'requirejs',
        'Run the r.js build script',
        function() {
            var done = this.async(),
                command = (os.platform() == 'win32') ? 'r.js.cmd' : 'r.js';
            exec(command + ' -o ./tools/build.js',
                function(err, stdout, stderr) {
                    if (err) {
                        grunt.fail.fatal('Problem with r.js: ' + err + ' ' + stderr);
                    }
                    grunt.log.writeln(stdout);
                    grunt.log.ok('Build complete.');
                    done();
                }
            );
        }
    );
    grunt.registerTask('default', ['clean:app', 'compass:app', 'jade', 'jshint:app']);
    grunt.registerTask('server', ['default', 'connect:dev', 'watch']);
    grunt.registerTask('build', ['default', 'requirejs']);
};