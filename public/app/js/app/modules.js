
var myModule = angular.module("MyModule",['DirectiveModules','owappServices','ServiceModules']);

var directiveModules = angular.module("DirectiveModules",['ChartDirectiveModules',
	'CustomeDirectiveModules']);

var chartDirectiveModules = angular.module("ChartDirectiveModules",['RealtimeFireChart',
	'VerticalChart','VerticalThinChart','CircleChart','RealtimeServerStatusChart',
	'SparkLineChart','FacebookChart','TwitterChart','StatusChart','BarChartColorSmall','ProgressBar']);

var customeDirectiveModules = angular.module('CustomeDirectiveModules',['UserNameDisplay']);

var serviceModules = angular.module('ServiceModules',['LoginUserService']);
myModule.
	 config(['$routeProvider', function($routeProvider) {
			$routeProvider.
				when('/login', {templateUrl: 'views/pages/login.html', controller: loginCntrl}).
				when('/dashboard', {templateUrl: 'views/pages/dashboard.html', controller: dashboardCntrl}).
				when('/infrastructure', {templateUrl: 'views/pages/infrastructure.html', controller: infrastructureCntrl}).
				when('/messages', {templateUrl: 'views/pages/messages.html', controller: messageCntrl}).
				otherwise({redirectTo:'/login'});
}]);
