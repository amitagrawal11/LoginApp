define(['angularAMD', 'ui-router'], function(angularAMD) {
    var app = angular.module("EmpLoginApp", ['ui.router']);
    app.config(function( $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
        .state("login", angularAMD.route({ // use ui-view
            url: "/login",
            controller: "LoginCtrl",
            controllerUrl: 'login.ctrl',
            templateUrl: "views/login.html"
        }))
        .state("home", angularAMD.route({
            url: "/",
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

    });

    app.run(function($rootScope, $location, $http, $state, $timeout, $window) {
        // keep user logged in after page refresh
        $rootScope.globals = angular.fromJson($window.sessionStorage.getItem("globals")) || {};

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.password; // jshint ignore:line
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // redirect to login page if not logged in
            if ( toState.name != 'login' && !$rootScope.globals.currentUser) {
                $timeout(function() {   $state.go('login');  }, 0);
            } else if ( toState.name == 'login' && $rootScope.globals.currentUser) {
                $timeout(function() {   $state.go('home');  }, 0);
            } 
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            console.log("SUCCESS");
        });

        $rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams) {
            console.log("NOT FOUND");
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
            console.log("CHANGE ERROR");
        });

        $rootScope.$on('$viewContentLoading', function(event, toState, toParams, fromState, fromParams) {
            console.log("VIEW CONTENT LOADING"); 
        });

        $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams) {
            console.log("VIEW CONTENT LOADED"); 
        });
    });

    return angularAMD.bootstrap(app);
});
