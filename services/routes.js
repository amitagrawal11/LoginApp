app.config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            controller: "LoginCtrl",
            templateUrl: "views/login.html",
            hideMenus: true
        })

    .when("/register", {
        controller: "RegisterCtrl",
        templateUrl: "views/register.html",
        hideMenus: true
    })

    .when("/home", {
        controller: "HomeCtrl",
        templateUrl: "views/home.html",
        hideMenus: true
    })

    .otherwise({ redirectTo: "/login" });
});

/*app.run(function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in
          if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
              $location.path('/login');
          }
      });
  });*/
