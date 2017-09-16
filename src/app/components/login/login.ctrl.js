define(['app','auth'], function(app) {
    app.controller('LoginCtrl', function($scope, AuthService, $state) {
        $scope.disableSubmitBtn = true; //By default disabling submit button 

        $scope.doSignIn = function() {
            // reset login status
            AuthService.resetCredentials();
            AuthService.loginService($scope.username, $scope.password).then(function(response){
                if (response.success) {
                    AuthService.setCredentials(response.user);
                    $state.go('home');
                } else {
                    $scope.errorMsg = response.message;
                }
            }, function(error){
                $scope.errorMsg = error;
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
