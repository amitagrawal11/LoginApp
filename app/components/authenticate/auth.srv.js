define(['app', 'employeeFctr', 'base64'], function(app) {
    app.service('AuthService', function($rootScope, $http, $q, $timeout, $window, employeeFactory, Base64) {
        this.setCredentials = function(username, password) {
            var encryptData = Base64.encode(username + ':' + password);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    password: encryptData
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encryptData;
            $window.sessionStorage.setItem("globals", angular.toJson($rootScope.globals));
        };

        this.resetCredentials = function() {
            $rootScope.globals = {};
            $window.sessionStorage.removeItem("globals");
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        this.loginService = function(username, password) {            
            var defer = $q.defer();               
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
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });  

            return defer.promise;          
        };

        return this;
    });
});
