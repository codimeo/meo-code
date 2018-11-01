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
        update_submodules: {
            default: {
                options: {
                    params: "--init --recursive"
                }
            }
        },
        clean: {
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
                        src: 'meo/index.html',
                        dest: 'meo/index_snap.html',
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'favicon.ico',
                            'meo.js',
                            'index.html',
                            'meo.html',
                        ],
                        dest: 'meo/',
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '**',
                        dest: 'meo/',
                        filter: function (filepath) {
                            return [
                                'src/favicon.ico',
                                'src/meo.js',
                                'src/librairies/LIBRAIRIES',
                            ].includes(filepath);
                        }
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
    grunt.loadNpmTasks('grunt-update-submodules');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-nodeunit');
    //grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['eslint', 'clean', 'copy']);
    grunt.registerTask('build', ['eslint', 'clean', 'copy']);
    grunt.registerTask(
        'full_build', 
        ['update_submodules', 'eslint', 'clean', 'copy']
    );

};
