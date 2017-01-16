define(['app','auth'], function(app) {
    app.controller('HomeCtrl', function($scope, $location, AuthService, $state) {
        angular.element('a').on('click', function(event){
        	event.preventDefault();
        });
        $scope.displaySuccessMsg = "You have successfully logged in";

        $scope.doLogOut = function() {
            AuthService.resetCredentials();
            //$location.path("/login");
            $state.go('login');
        };
    });
});
