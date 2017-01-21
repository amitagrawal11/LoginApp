define(['app'], function(app) {
    app.factory('userFactory', function($q, $http) {
        this.getUser = function(username) {
            var defer = $q.defer();
            
            // Initiating http get request to get user data from data.json file 
            $http.get('data.json').then(function(response){
                var output = {};
                var regExp = /[^a-zA-Z0-9 ]/;
                if (!regExp.test(username)) { // user does not contains special charaters or not
                    if (response.data.length) {
                        var user = response.data.find(function(emp) {
                            return emp.username === username;
                        });
                        if (user) {
                            output = { user: user };
                        } else {
                            output = { message: "User does not exists!" };
                        }
                    } else {
                        output = { message: "No user record found" };
                    }
                } else {
                    output = { message: "Username contains special characters!" };
                }
                defer.resolve(output);
            }, function(error){
                defer.reject(error);
            });

            // returning promise after getting results
            return defer.promise;
        };

        return this;
    });
});
