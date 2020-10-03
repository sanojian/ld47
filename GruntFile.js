module.exports = function(grunt) {

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		watch: {
			scripts: {
				files: [
					'src/js/**/*.js',
					'src/html/index.html'
				],
				tasks: ['jshint','concat']
			}
		},
		'http-server': {
			dev: {
				root: '',
				port: 3119,
				runInBackground: true
			}
		},
		jshint: {
			options: {
				evil: true
			},
			all: ['src/js/**/*.js']
		},
    clean: ['dist/'],
    copy: {
      assets: {
        src: 'assets/**',
        dest: 'dist/',
        cwd: 'src/',
        expand: true
      }
    },
		concat: {
			basic_and_extras: {
				files: {
					'dist/js/index.js': ['src/js/main.js', 'src/js/**/*.js'],
					'dist/index.html': ['src/html/index.html']
				}
			}
		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-ssh');
	grunt.registerTask('dev', [
		'watch'
	]);
	grunt.registerTask('build', ['clean', 'jshint', 'concat', 'copy']);
	grunt.registerTask('default', ['build', 'http-server', 'dev']);

};
