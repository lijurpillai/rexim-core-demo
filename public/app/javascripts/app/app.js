'use strict';

angular.module('owaApp', ['owaApp.directives','owappServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/dashboard', {templateUrl: 'partials/dashboard.html',controller: MainCtrl}).
      when('/charts', {templateUrl: 'partials/charts.html',controller: PieCtrl}).
      when('/error', {templateUrl: 'partials/error.html',controller: ErrCtrl}).
		otherwise({redirectTo: '/dashboard'});
}]);