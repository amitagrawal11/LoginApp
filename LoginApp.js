/* Angular Login Application */

var app = angular.module("EmpLoginApp", []);

app.controller('EmployeeCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.emp = {};
    $scope.emp.username = "";
    $scope.emp.password = "";
    $scope.successMsg = "";
    $scope.showHomepage = false;
    $scope.disableSubmitBtn = true; //By default disabling submit button 

    $scope.doSignIn = function() {
        AuthService.loginService($scope.emp.username, $scope.emp.password, function(response){
        	if(response.success){
        		$scope.showHomepage = true;
        		$scope.successMsg = "User has signed-in successfully!";
        		$scope.errorMsg = "";
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
}]);