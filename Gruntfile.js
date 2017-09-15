 var path = require('path');
 //add the config file name
 var configFile = path.resolve('./config.json');
 var config = require(configFile);
 module.exports = function(grunt) {
     grunt.initConfig({
         msdeploy: {
             push: {
                 options: {
                     verb: 'sync',
                     allowUntrusted: true,
                     source: {
                         'contentPath': config.srcPath
                     },
                     dest: {
                         contentPath: config.contentPath,
                         wmsvc: config.serverAddress,
                         userName: config.userName,
                         authType: 'basic'
                             //password: config.password
                     }
                 }
             }
         }
     });
     grunt.loadNpmTasks('grunt-msdeploy');
     //add task for deployment - copying the dist from local server to remote server
     grunt.registerTask('deploy', ['msdeploy:push']);
 }