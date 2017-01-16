requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
    	// Modules (Controllers)
        'app'						: 'app',
        'home.ctrl' 				: 'modules/home.ctrl',
        'login.ctrl'				: 'modules/login.ctrl',
        'register.ctrl'             : 'modules/register.ctrl',

        // Services 
       	'auth'					    : 'services/auth.srv',
       	'base64'					: 'services/base64.srv',
       	'employeeFctr'			    : 'services/employee.fctr',

        // Libraries
        'angular' 				    : 'lib/angular.min',
        'angularAMD'                : 'lib/angular-amd.min',
        'jquery' 					: 'bootstrap/jquery.min',
        'bootstrap' 				: 'bootstrap/bootstrap.min',
        'ng-cookies'			    : 'lib/angular-cookies.min',
        'ng-route' 			        : 'lib/angular-route.min',
        'ng-storage' 		        : 'lib/angular-storage.min',
        'ui-router'		            : 'lib/angular-ui-router.min'
    },
    shim: {
        'angularAMD'                : ['angular'],
        'ui-router'                 : ['angular'],
        'ng-route'                  : ['angular'],
        'ng-cookies'                : ['angular'],
        'ng-storage'                : ['angular'],
        'home.ctrl'                 : ['jquery', 'bootstrap']
    },

    // 3. kick off the application
    deps: ['app']
});

// Start the main app logic. || another way to bootstrap application
/*requirejs(['app'], function   (app) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    angular.bootstrap(document, ['app'])
});*/
