(function() {
    app.factory('employeeFactory', function($q, $http) {
        this.getEmpByUserId = function(username) {
            var defer = $q.defer();
            var response = {};
            var regExp = /[^a-zA-Z0-9 ]/;
            var employees = [{
                "name": "Amit",
                "age": 26,
                "username": "amit",
                "password": "pass"
            }, {
                "name": "Sohan",
                "age": 22,
                "username": "sohan1",
                "password": "SOHAN"
            }, {
                "name": "Pooja",
                "age": 30,
                "username": "pooja1",
                "password": "POOJA"
            }];

            if (!regExp.test(username)) { // user does not contains special charaters or not
                if (employees.length) {
                    var employee = employees.find(function(emp) {
                        return emp.username === username; });
                    if (employee) {
                        response = { employee: employee };
                    } else {
                        response = { message: "Employee does not exists!" };
                    }
                } else {
                    response = { message: "No employee record found" };
                }
                defer.resolve(response);
            } else {
                response = { message: "Username contains special characters!" };
                defer.reject(response);
            }
            return defer.promise;
        };

        return this;
    });
})();
