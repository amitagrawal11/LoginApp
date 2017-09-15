module.exports = function(grunt) {

	//-- config main project setting
    grunt.initConfig({
    	
    	//-- basic setting
        //-- read dependencied from 'package.json' 
    	pkg : grunt.file.readJSON('package.json'), 

        //-- clean build folder before copy file from cwd
        clean: {
            build: {
                src: [ 'build' ]
            }
        },
        
        //-- copy all files from curront working directory to build directory        
        copy: {
            files: {
                cwd: 'app',  // set current working directory
                src: '**/*',          // copy all files and subfolders
                dest: 'build',        // destination folder
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
                    cwd: 'build',
                    src: ['**/*.js'],
                    dest: 'build'
                }]
            }
        },
        //-- css minification
        // cssmin : {
        //     combine : {
        //         files : {
        //             'build/assets/stylesheets/main.min.css' : [
        //                 'build/app/assets/stylesheets/animate.css',
        //                 'build/app/assets/stylesheets/jquery.window.css',
        //                 'build/app/assets/stylesheets/r7.base.css',
        //                 'build/app/assets/stylesheets/r7.custom-gis.css',
        //                 'build/app/assets/stylesheets/r7.modules.css',
        //                 'build/app/assets/stylesheets/style.css'
        //             ]
        //         }
        //     }
        // },
    });

    //-- load the plugins
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
	grunt.registerTask('default', ['clean','copy', 'uglify']);
	
};
