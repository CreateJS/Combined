var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Setup Uglify for JS minification.
		uglify: {
			options: {
				banner: grunt.file.read('LICENSE'),
				preserveComments: "some",
				compress: {
					global_defs: {
						"DEBUG": false
					}
				},
			},
			build:  {
				files: {
					'builds/createjs-<%= grunt.template.today("yyyy.mm.dd") %>.min.js':getCombinedSource()
				}
			}
		},
		copy: {
			build: {
				files: [
					{expand:true, cwd:getConfigValue('easel_path')+'build/output', src:'*.js', dest:getConfigValue('site_path')+'/Demos/!(EaselJS)/assets'},
				]
			}
		},
		concat: {
			options: {
				separator: ''
			},
			build: {
				files: {
					'builds/createjs-<%= grunt.template.today("yyyy.mm.dd") %>.combined.js': getCombinedSource()
				}
			}
		},
		hub: {
			options: {
				concurrent: 4
			},
			build: {
				src: getHubTasks(),
				tasks: ['build'],
			},
			next: {
				src: getHubTasks(),
				tasks: ['next'],
			},
		},
		multicopy: {
			build: {
				files: [
					// Copy JS files into each libaries examples folder.
					{cwd:getConfigValue('easel_path')+'build/output', src:'*NEXT.min.js', dest:[
						getConfigValue('preload_path')+'/examples/assets',
						getConfigValue('sound_path')+'/examples/assets',
						getConfigValue('tween_path')+'/examples/assets'
					]},
					{cwd:getConfigValue('preload_path')+'build/output', src:'*NEXT.min.js', dest:[
						getConfigValue('easel_path')+'/examples/assets',
						getConfigValue('sound_path')+'/examples/assets',
						getConfigValue('tween_path')+'/examples/assets'
					]},
					{cwd:getConfigValue('sound_path')+'build/output', src:'*NEXT.min.js', dest:[
						getConfigValue('easel_path')+'/examples/assets',
						getConfigValue('preload_path')+'/examples/assets',
						getConfigValue('tween_path')+'/examples/assets'
					]},
					{cwd:getConfigValue('tween_path')+'build/output', src:'*NEXT.min.js', dest:[
						getConfigValue('easel_path')+'/examples/assets',
						getConfigValue('preload_path')+'/examples/assets',
						getConfigValue('sound_path')+'/examples/assets'
					]},
				]
			}
		},
		copy: {
			build: {
				files: [
						// Copy over all the latest source into the sites demo/src folder.
						// This ignores easeljs packages in other libraries.
					{expand:true, cwd:getConfigValue('easel_path')+'src/', src:'**/*.js', dest:getConfigValue('site_path')+'/Demos/src'},
					{expand:true, cwd:getConfigValue('preload_path')+'src/', src:'**/!(easeljs)*.js', dest:getConfigValue('site_path')+'/Demos/src'},
					{expand:true, cwd:getConfigValue('sound_path')+'src/', src:'**/!(easeljs)*.js', dest:getConfigValue('site_path')+'/Demos/src'},
					{expand:true, cwd:getConfigValue('tween_path')+'src/', src:'**/!(easeljs)*.js', dest:getConfigValue('site_path')+'/Demos/src'},

					// Copy examples over to the site.
					{expand:true, cwd:getConfigValue('easel_path')+'/examples', src:'**', dest:getConfigValue('site_path')+'/Demos/EaselJS'},
					{expand:true, cwd:getConfigValue('preload_path')+'/examples', src:'**', dest:getConfigValue('site_path')+'/Demos/PreloadJS'},
					{expand:true, cwd:getConfigValue('sound_path')+'/examples', src:'**', dest:getConfigValue('site_path')+'/Demos/SoundJS'},
					{expand:true, cwd:getConfigValue('tween_path')+'/examples', src:'**', dest:getConfigValue('site_path')+'/Demos/TweenJS'}
				]
			}
		},

		clean: {
			options: {
				force: true
			},
			examples:[
				getConfigValue('site_path')+'/Demos/EaselJS',
				getConfigValue('site_path')+'/Demos/PreloadJS',
				getConfigValue('site_path')+'/Demos/SoundJS',
				getConfigValue('site_path')+'/Demos/TweenJS'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-hub');

	grunt.registerTask('start', 'Internal task, sets the start time of a build, for metrics.', function() {
		grunt.config.set('startTime', Date.now());
	});

	grunt.registerTask('end', 'Internal task, traces how long the build took, for metrics.', function() {
		var time = Date.now()-grunt.config.get('startTime');
		grunt.log.ok('Done, build took: ' + (time/1000) + ' seconds.');
	});

	// Main tasks
	grunt.registerTask('build', 'Build every project using the latest version in each package.json.', ['start', 'hub:build', 'coreBuild', 'end']);
	grunt.registerTask('next', 'Build every project using a NEXT version.', ['start', 'hub:next', 'coreBuild', 'end']);
	grunt.registerTask('core','Main task that only runs global tasks. (The child projects are not built)' ,['js', 'multicopy', 'clean:examples', 'copy']);
	grunt.registerTask('js', 'Only minifys and combines the javascript files.', ['uglify', 'concat']);

	grunt.registerMultiTask('multicopy', function() {
		this.data.files.forEach(function(item, index, array) {
			var src = item.cwd+'/'+item.src;
			var sources = grunt.file.expand(src);
			var dests = item.dest instanceof Array?item.dest:[item.dest];
			var copyCount = 0;
			dests.forEach(function(destPath, index, array) {
				var destinations = grunt.file.expand(destPath);

				sources.forEach(function(src) {
					var name = path.basename(src);
					destinations.forEach(function(dest) {
						grunt.file.copy(src, dest+'/'+name);
						copyCount++;
					});
				});
			});
			grunt.log.ok('Copied ' + copyCount + ' files.');
		});
	});

	function getConfigValue(name) {
		var config = grunt.config('config');
		if (config) {
			return config[name];
		}

		// Read the global settings file first.
		var config = grunt.file.readJSON('config.json');

		// If we have a config.local.json .. prefer its values.
		if (grunt.file.exists('config.local.json')) {
			var config2 = grunt.file.readJSON('config.local.json');
			_.extend(config, config2);
		}

		grunt.config.set('config', config);

		return config[name];
	}

	function getHubTasks() {
		var files = [
			getConfigValue('easel_path')+'build/Gruntfile.js',
			getConfigValue('preload_path')+'build/Gruntfile.js',
			getConfigValue('sound_path')+'build/Gruntfile.js',
			getConfigValue('tween_path')+'build/Gruntfile.js'
		];
		return files;
	}

	function getCombinedSource() {
		var configs = [
			{cwd: getConfigValue('easel_path') + '/build/', config:'config.json', source:'easel_source'},
			{cwd: getConfigValue('preload_path') + '/build/', config:'config.json', source:'source'},
			{cwd: getConfigValue('sound_path') + '/build/', config:'config.json', source:'source'},
			{cwd: getConfigValue('tween_path') + '/build/', config:'config.json', source:'source'},
		]

		// Pull out all the source paths.
		var sourcePaths = [];
		for (var i=0;i<configs.length;i++) {
			var o = configs[i];
			var json = grunt.file.readJSON(path.resolve(o.cwd, o.config));
			var sources = json[o.source];
			sources.forEach(function(item, index, array) {
				array[index] = path.resolve(o.cwd, item);
			});
			sourcePaths = sourcePaths.concat(sources);
		}

		// Remove duplicates (Like EventDispatcher)
		var dups = {};
		var clean = [];
		for (i=0;i<sourcePaths.length;i++) {
			var src = sourcePaths[i];
			var cleanSrc = src.substr(src.lastIndexOf('src/'));
			if  (dups[cleanSrc] == null) {
				clean.push(src);
				dups[cleanSrc] = true;
			}
		}

		return clean;
	}
}
