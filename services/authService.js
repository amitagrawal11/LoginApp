app.service('AuthService', function(employeeFactory, $timeout) {
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
