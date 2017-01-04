define(['app','auth'], function(app) {
    app.controller('HomeCtrl', function($scope, $location, AuthService) {
        $scope.displaySuccessMsg = "You have successfully logged in";

        $scope.doLogOut = function() {
            AuthService.resetCredentials();
            $location.path("/login");
        };
    });
});
