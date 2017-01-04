define(['app', 'ng-storage', 'employeeFctr', 'base64'], function(app) {
    app.service('AuthService', function($rootScope, $http, $timeout, $sessionStorage, employeeFactory, Base64) {
        this.setCredentials = function(username, password) {
            var authData = Base64.encode(username + ':' + password);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    password: authData
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
            $sessionStorage.globals = $rootScope.globals;
        };

        this.resetCredentials = function() {
            $rootScope.globals = {};
            $sessionStorage.globals = {};
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        this.loginService = function(username, password, callback) {            
            $timeout(function() {                
                var response;                
                employeeFactory.getEmpByUserId(username).then(function(response) {
                    if (!/[^a-zA-Z0-9 ]/.test(password)) {
                        if (response.employee && response.employee.password === password) {
                            response.success = true;
                        } else if (response.employee && response.employee.password !== password) {
                            response.success = false;
                            response.message = "Invalid employee credentials, Try again!";
                        } else {
                            response.success = false;
                        }
                    } else {
                        response.success = false;
                        response.message = "Password contains special characters!";
                    }
                    callback(response);                    
                }, function(error) {
                    callback(error);
                });            
            }, 1000);      
        };

        return this;
    });
});
