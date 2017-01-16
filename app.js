define(['angularAMD', 'ui-router', /*'ng-route',*/ 'ng-cookies' , 'ng-storage'], function(angularAMD) {
    var app = angular.module("EmpLoginApp", [/*'ngRoute',*/'ngCookies', 'ngStorage', 'ui.router']);
    app.config(function(/*$routeProvider,*/ $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
        .state("login", angularAMD.route({ // use ui-view
            url: "/login",
            controller: "LoginCtrl",
            controllerUrl: 'login.ctrl',
            templateUrl: "views/login.html"
        }))
        .state("home", angularAMD.route({
            url: "/home",
            //abstract: true,
            controller: "HomeCtrl",
            controllerUrl: 'home.ctrl',
            templateUrl: "views/home.html"
        }))
        .state("register", angularAMD.route({
            url: "/register",
            controller: "RegisterCtrl",
            controllerUrl: 'register.ctrl',
            templateUrl: "views/register.html"
        }));

        /*$routeProvider.when("/login", angularAMD.route({           // use ng-view to render views 
            controller: "LoginCtrl",
            controllerUrl: 'login.ctrl',
            templateUrl: "views/login.html"
        })).when("/home", angularAMD.route({
            controller: "HomeCtrl",
            controllerUrl: 'home.ctrl',
            templateUrl: "views/home.html"
        })).otherwise({ redirectTo: "/login" });*/
    });

    app.run(function($rootScope, $location, $sessionStorage, $http, $state, $timeout) {
        // keep user logged in after page refresh
        $rootScope.globals = $sessionStorage.globals || {};
        //$rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.password; // jshint ignore:line
        }

        /*$rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            } else if ($location.path() === '/login' && $rootScope.globals.currentUser) {
                //$location.path('/home');
                console.log("current path :" + $location.path());
            }
        });*/

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            // redirect to login page if not logged in
            if ( toState.name != 'login' && !$rootScope.globals.currentUser) {
                $timeout(function(){   $state.go('login');  }, 0);
            } else if ( toState.name == 'login' && $rootScope.globals.currentUser) {
                $timeout(function(){   $state.go('home');  }, 0);
            } 
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            console.log("SUCCESS");
        });

        $rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams){
            console.log("NOT FOUND");
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams){
            console.log("CHANGE ERROR");
        });

        $rootScope.$on('$viewContentLoading', function(event, toState, toParams, fromState, fromParams){
            console.log("VIEW CONTENT LOADING"); 
        });

        $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){
            console.log("VIEW CONTENT LOADED"); 
        });
    });

    return angularAMD.bootstrap(app);
});
