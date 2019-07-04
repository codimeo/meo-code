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
                            /* 'dist/**',
                            'libraries/**', */
                        ],
                        dest: 'meo/',
                        /* filter: function (filepath) {
                            return ![
                                'src/libraries/LIBRARIES',
                            ].includes(filepath);
                        } */
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**',
                        dest: 'meo/',
                        filter: function (filepath) {
                            return ![
                                'src/favicon.ico',
                                'src/meo.js',
                                'src/libraries/LIBRARIES',
                                'src/Examples/EXAMPLES',
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
        },
        concat:{
            options: {
                separator: '',
            },
            libraries: {
                src: ['meo/libraries/LIBRARIES', 'src/libraries/LIBRARIES'],
                dest: 'meo/libraries/LIBRARIES',
            },
            examples: {
                src: ['meo/Examples/EXAMPLES', 'src/Examples/EXAMPLES'],
                dest: 'meo/Examples/EXAMPLES',
            },
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-update-submodules');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-nodeunit');
    //grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['eslint', 'clean', 'copy', 'concat']);
    grunt.registerTask('build', ['eslint', 'clean', 'copy', 'concat']);
    grunt.registerTask(
        'full_build', 
        ['update_submodules', 'eslint', 'clean', 'copy', 'concat']
    );

};
