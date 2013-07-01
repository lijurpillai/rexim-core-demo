
var myModule = angular.module("MyModule",['DirectiveModules','ServiceModules']);
//var myModule = angular.module("MyModule",['DirectiveModules','owappServices','ServiceModules']);

var directiveModules = angular.module("DirectiveModules",['ChartDirectiveModules','CustomeDirectiveModules']);

var chartDirectiveModules = angular.module("ChartDirectiveModules",['RealtimeFireChart',
	'VerticalChart','VerticalThinChart','CircleChart','RealtimeServerStatusChart',
	'SparkLineChart','FacebookChart','TwitterChart','StatusChart','BarChartColorSmall','TemperatureStatusChart','ProgressBar']);

var customeDirectiveModules = angular.module('CustomeDirectiveModules',['UserNameDisplay']);

var serviceModules = angular.module('ServiceModules',['LoginUserService','UiDataService']);
myModule.
	 config(['$routeProvider', function($routeProvider) {
			$routeProvider.
				when('/login', {templateUrl: 'views/pages/login.html', controller: loginCntrl}).
				when('/dashboard', {templateUrl: 'views/pages/dashboard.html', controller: dashboardCntrl}).
				when('/dashboard_realtime', {templateUrl: 'views/pages/dashboard_realtime.html', controller: dashboardCntrl}).
				when('/dashboard_history', {templateUrl: 'views/pages/dashboard_history.html', controller: dashboardHistoryCntrl}).
				when('/actiontable', {templateUrl: 'views/pages/actionTable.html', controller: actionTableCtrl}).				
				otherwise({redirectTo:'/login'});
}]);
