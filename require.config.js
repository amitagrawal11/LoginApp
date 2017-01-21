requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'app/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
    	// Modules (Controllers)
        'app'						: 'main-app',
        'home.ctrl' 				: 'components/home/home.ctrl',
        'login.ctrl'				: 'components/login/login.ctrl',
        'register.ctrl'             : 'components/register/register.ctrl',

        // Services 
       	'auth'					    : 'components/authenticate/auth.srv',
       	'base64'					: 'components/authenticate/base64.srv',
       	'employeeFctr'			    : 'components/authenticate/employee.fctr',

        // Libraries
        'angular' 				    : 'vendors/angular/angular.min',
        'angularAMD'                : 'vendors/angular/angularAMD.min',
        'jquery' 					: 'vendors/jquery/jquery.min',
        'bootstrap' 				: 'vendors/bootstrap/bootstrap.min',
        'ng-cookies'			    : 'vendors/angular/angular-cookies.min',
        'ng-route' 			        : 'vendors/angular/angular-route.min',
        'ng-storage' 		        : 'vendors/angular/angular-storage.min',
        'ui-router'		            : 'vendors/angular/angular-ui-router.min',
        'metis-menu'                : 'vendors/metis-menu/metisMenu.min'
    },
    shim: {
        'metis-menu'               : ['jquery'],
        'bootstrap'                 : ['jquery'],
        'angularAMD'                : ['angular'],
        'ui-router'                 : ['angular'],
        'ng-route'                  : ['angular'],
        'ng-cookies'                : ['angular'],
        'ng-storage'                : ['angular']
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
