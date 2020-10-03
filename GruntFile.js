var path = require('path');
var dirname = (new Date()).toISOString();

module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    develop: {
			server: {
				file: './server/server.js'
			}
		},
    watch: {
        scripts: {
            files: [
                'src/js/**/*.js',
                'src/assets/**/*.js'
            ],
            tasks: ['jshint', 'concat:shared', 'concat:local']
        },
        pages: {
          files: [
              'src/html/*.*'
          ],
          tasks: ['copy:html']
        }
    },
    jshint: {
        options: {
            evil: true
        },
        all: ['src/js/*.js']
    },
    copy: {
      assets: {
        src: 'assets/**',
        dest: 'dist/',
        cwd: 'src/',
        expand: true
      },
      html: {
        src: '*.*',
        dest: 'dist/',
        cwd: 'src/html',
        expand: true
      }
    },
    clean: ['dist/'],
    obfuscator: {
			options: {
				banner: '/*! Copyright Lax Viking Games <%= grunt.template.today("yyyy") %> - ' +
					'Built <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				domainLock: [
					'.gamejolt.net',						// gamejolt
					'.konggames.com',						// kongregate
					'uploads.ungrounded.net',		// newgrounds
					'v6p9d9t4.ssl.hwcdn.net', 	// itch.io
					'localhost', 	              // local
					'.laxviking.com'						// our AWS server
				],
				compact: true,
		    controlFlowFlattening: false,
		    deadCodeInjection: false,
		    debugProtection: false,
		    debugProtectionInterval: false,
		    disableConsoleOutput: true,
		    identifierNamesGenerator: 'hexadecimal',
		    log: false,
		    renameGlobals: false,
		    rotateStringArray: true,
		    selfDefending: true,
		    stringArray: false, // changed from high performace settings
		    stringArrayEncoding: false,
		    stringArrayThreshold: 0.75,
		    unicodeEscapeSequence: false
			},
			task1: {
				files: {
					'dist/js/index.js': ['dist/js/index.js']
				}
			}
		},
		concat: {
			shared: {
				files: {
					'dist/js/index.js': [
            'src/js/main.js',
            'src/js/Unit.js',
            'src/js/**/*.js',
            'src/assets/**/*.js'
          ],
          'dist/js/maps.js': [
            'src/assets/maps/*.js'
          ]
				},
			},
      local: {
        files: {
          'dist/js/config.js': ['src/config/config_client_local.js']
        }
      },
      development: {
        files: {
          'dist/js/config.js': ['src/config/config_client_dev.js']
        }
      },
      production: {
        files: {
          'dist/js/config.js': ['src/config/config_client_prod.js']
        }
      },
		}
  });

  grunt.registerTask('server', [
		'develop:server',
		'watch'
	]);

	grunt.registerTask('production', ['jshint', 'clean', 'concat:shared', 'concat:production', 'copy', 'obfuscator']);
	grunt.registerTask('development', ['jshint', 'clean', 'concat:shared', 'concat:development', 'copy']);
	grunt.registerTask('local', ['jshint', 'clean', 'concat:shared', 'concat:local', 'copy']);
	//grunt.registerTask('buildobf', ['jshint', 'clean', 'obfuscator', 'copy']);
	grunt.registerTask('default', ['local','server']);

};
