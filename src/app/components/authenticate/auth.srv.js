define(['app', 'user.fctr', 'base64'], function(app) {
    app.service('AuthService', function($rootScope, $http, $q, $timeout, $window, userFactory, Base64) {
        this.setCredentials = function(user) {
            var encryptData = Base64.encode(user.username + ':' + user.password);

            user.password = encryptData;

            $rootScope.globals = {
                currentUser: user
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
            userFactory.getUser(username).then(function(response) {
                if (!/[^a-zA-Z0-9 ]/.test(password)) {
                    if (response.user && response.user.password === password) {
                        response.success = true;
                    } else if (response.user && response.user.password !== password) {
                        response.success = false;
                        response.message = "Invalid user credentials, Try again!";
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
