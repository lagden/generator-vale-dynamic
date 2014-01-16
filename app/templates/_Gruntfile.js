'use strict';

var os = require('os'),
    exec = require('child_process').exec,
    appUseJquery = <%= useJquery %>,
    appAddHtml5shiv = <%= addHtml5shiv %>,
    serverPort = <%= projectLocalServerPort %>,
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
            iframe: buildJade('iframe', '', appUseJquery, appAddHtml5shiv, false, true),
            txt: buildJade('txt', pathFinal, appUseJquery, appAddHtml5shiv, false, false),
            server: buildJade('server', '/', appUseJquery, appAddHtml5shiv, true, true)
        },
        connect: {
            dev: buildConnect(serverPort, '*', false, true, true, pathDevDoc),
            build: buildConnect(serverPort, '*', true, false, false, pathBuildDoc)
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

function buildJade(el, path, appUseJquery, appAddHtml5shiv, debug, isHtml) {
    var o = {
        'options': {
            'pretty': true,
            'data': {
                'path': path || '/',
                'useJquery': appUseJquery,
                'addHtml5shiv': appAddHtml5shiv,
                'debug': debug
            }
        },
        'files': {}
    };
    if (isHtml) {
        o.files['dev/Documents/app/' + el + '.html'] = ['jade/templates/index.jade'];
    } else {
        o.files['dev/Documents/app/' + el + '.txt'] = ['jade/templates/body.jade'];
    }
    return o;
}

function buildConnect(port, hostname, keepalive, livereload, debug, base, open) {
    var o = {
        'options': {
            'port': port || 9000,
            'hostname': hostname || '*',
            'keepalive': keepalive || false,
            'livereload': livereload || false,
            'debug': debug || false,
            'base': base,
            'open': open || 'http://localhost:' + port + '/server.html'
        }
    }
    return o;
}