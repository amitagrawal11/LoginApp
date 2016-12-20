/* Angular Login Application */

var app = angular.module("AngularApp", []);

app.factory('EmployeeFactory', function($q, $http){
	var employees = [
		{
			"name":"Amit",
			"age":26,
			"username":"amit",
			"password":"pass"
		},
		{
			"name":"Sohan",
			"age":22,
			"username":"sohan1",
			"password":"SOHAN"
		},
		{
			"name":"Pooja",
			"age":30,
			"username":"pooja1",
			"password":"POOJA"
		}
	];

	this.getEmpByUserId = function(username){
		var defer = $q.defer();
		var response ={};
		var regExp = /[^a-zA-Z0-9 ]/;
		if(!regExp.test(username)){			// user does not contains special charaters or not

			//--------- calling api to get json data 
			var httpOptions = {
				method:"GET",
				url:"data.json",
				headers:{
					"Content-Type":"application/json",
					"Accept":"application/json",
					"Access-Control-Allow-Origin": "*.*",
					"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
				}
			};

			$http(httpOptions).then(function(employees){
				if(employees.length){
					var employee = employees.find(function(emp){ return emp.username === username;});
					if(employee.length){
						response  = { employee: employee};
					} else { 
						response = { message: "Employee does not exists!"};
					}	
				} else {
					response = { message: "No employee record found"};
				}
				defer.resolve(response);
			}, function(error){
				defer.reject(error);
			});

			//---------------------------------------
			
		} else {
			response = { message: "Username contains special characters!"};
			defer.reject(response);
		}
		return defer.promise;
	};

	return this;
});

app.service('AuthService', function(EmployeeFactory, $timeout) {
    this.loginService = function(username, password, callback) {             
    	$timeout(function() {                
            var response;                
            EmployeeFactory.getEmpByUserId(username).then(function(response) {
            	if(response.employee && response.employee.password === password){
            		response.success = true;
            	} else if(response.employee && response.employee.password !== password){
            		response.success = false;
            		response.message = "Invalid employee credentials, Try again!";
            	} else {
            		response.success = false;
            	}
                callback(response);                     
            }, function(error){
            	callback(error);
            });             
        }, 3000);       
    };

    return this;
});

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
        	} else {
        		$scope.showHomepage = false;
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