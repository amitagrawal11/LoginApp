define([], 
    function(){
        var app = angular.module("EmpLoginApp", ['ngRoute', 'ngCookies', 'ngStorage', 'ui-router']);

        return angular.bootstrap(app);
    }
);
