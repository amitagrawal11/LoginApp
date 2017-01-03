/* Angular Login Application */

var app = angular.module("EmpLoginApp", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when("/login", {
            controller: "LoginCtrl",
            templateUrl: "views/login.html",
            hideMenus: true
        })

        .when("/register", {
            controller: "RegisterCtrl",
            templateUrl: "views/register.html",
            hideMenus: true
        })

        .when("/home", {
            controller: "HomeCtrl",
            templateUrl: "views/home.html",
            hideMenus: true
        })

        .otherwise({ redirectTo: "/login" });
});

/*.run(function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });
});*/

app.controller('LoginCtrl', function($scope, AuthService, $location) {
    $scope.emp = {};
    $scope.emp.username = "";
    $scope.emp.password = "";
    $scope.successMsg = "";
    $scope.showHomepage = false;
    $scope.disableSubmitBtn = true; //By default disabling submit button 

    $scope.doSignIn = function() {
        AuthService.loginService($scope.emp.username, $scope.emp.password, function(response){
        	if(response.success){
                //redirect it to home page
                $location.path("/home");
        		/*$scope.showHomepage = true;
        		$scope.successMsg = "User has signed-in successfully!";
        		$scope.errorMsg = "";*/
        	} else {
        		$scope.showHomepage = false;
        		$scope.successMsg = "";
        		$scope.errorMsg = response.message;
        	}
        });
    };

    $scope.enableSubmitBtn = function() {
        if ($scope.emp.username && $scope.emp.password) {
            return true;
        }
        return false;
    }
});


app.controller('HomeCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.displaySuccessMsg = "You have successfully logged in";
}]);
