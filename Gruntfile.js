module.exports = function(grunt) {

	//-- config main project setting
    grunt.initConfig({
    	
    	//-- basic setting
        //-- read dependencied from 'package.json' 
    	pkg : grunt.file.readJSON('package.json'), 

        //-- clean dist folder before copy file from cwd
        clean: {
            dist: {
                src: [ 'dist' ]
            }
        },
        
        //-- copy all files from curront working directory to dist directory        
        copy: {
            files: {
                cwd: 'src',  // set current working directory
                src: '**/*',          // copy all files and subfolders
                dest: 'dist',        // destination folder
                expand: true          // required when using cwd
            }
        },

        //-- uglify all js files in app folder
        uglify: {
            options: {
                mangle: false
                //preserveComments :true
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/app',
                    src: ['**/*.js'],
                    dest: 'dist/app'
                }]
            }
        },
        //-- css minification
        // cssmin : {
        //     combine : {
        //         files : {
        //             'dist/assets/stylesheets/main.min.css' : [
        //                 'dist/app/assets/stylesheets/animate.css',
        //                 'dist/app/assets/stylesheets/jquery.window.css',
        //                 'dist/app/assets/stylesheets/r7.base.css',
        //                 'dist/app/assets/stylesheets/r7.custom-gis.css',
        //                 'dist/app/assets/stylesheets/r7.modules.css',
        //                 'dist/app/assets/stylesheets/style.css'
        //             ]
        //         }
        //     }
        // },

        iis: {
            developer: {
              physicalPath : "dist",
              site : 'Default Web Site',
              path : 'NewSite',
              pool : 'DefaultAppPool',
              bindings: 'http/*:9001:localhost',
              managedRuntimeVersion : 'v4.0'
            }
        },
    });

    //-- load the plugins
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-iis');

    // Default task(s).
	grunt.registerTask('default', ['clean','copy', 'uglify', 'iis']);
	
};
