
var myModule = angular.module("MyModule",['DirectiveModules']);

var directiveModules = angular.module("DirectiveModules",['ProgressBar',
	'RealtimeFireChart','VerticalChart','VerticalThinChart','CircleChart',
	'RealtimeServerStatusChart','SparkLineChart','FacebookChart','TwitterChart','StatusChart']);

myModule.
	 config(['$routeProvider', function($routeProvider) {
			$routeProvider.
				when('/dashboard', {templateUrl: 'views/pages/dashboard.html', controller: dashboardCntrl}).
				when('/infrastructure', {templateUrl: 'views/pages/infrastructure.html', controller: infrastructureCntrl}).
				when('/messages', {templateUrl: 'views/pages/messages.html', controller: messageCntrl}).
				when('/login', {templateUrl: 'views/pages/login.html', controller: loginCntrl}).
				otherwise({redirectTo: '/dashboard'});
}]);
