define(['app','auth'], function(app) {
    app.controller('LoginCtrl', function($scope, AuthService, $location) {
        $scope.disableSubmitBtn = true; //By default disabling submit button 

        // reset login status
        AuthService.resetCredentials();

        $scope.doSignIn = function() {
            AuthService.loginService($scope.username, $scope.password, function(response) {
                if (response.success) {
                    AuthService.setCredentials($scope.username, $scope.password);
                    $location.path("/home");
                } else {
                    $scope.errorMsg = response.message;
                }
            });
        };

        $scope.enableSubmitBtn = function() {
            if ($scope.username && $scope.password) {
                return true;
            }
            return false;
        }
    });
});
