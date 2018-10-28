'use strict';

/* global module*/

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
    // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %>' +
        '<%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean:{
            meo: {
                src: [ 'meo' ],
            }
        },
        copy: {
            meo: {
                files: [
                    {
                        expand: true,
                        cwd: 'Snap/',
                        src: '**',
                        dest: 'meo/',
                    },
                    {
                        src: [
                            'src/favicon.ico',
                            'src/meo.js',
                        ],
                        dest: 'meo/',
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '**',
                        dest: 'meo/',
                        exclude: [
                            'src/favicon.ico',
                            'src/meo.js',
                            'src/librairies/LIBRAIRIES',
                        ]
                    }
                ]
            }
        },
        eslint: {
            target: [
                'src/*.js',
            ],
            watch: {
                meo: {
                    files: ['<%= eslint.target.src%>'],
                    tasks: ['eslint'],
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-nodeunit');
    //grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jslint', 'watch', 'clean', 'copy']);

};
