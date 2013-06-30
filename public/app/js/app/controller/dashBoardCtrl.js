"use strict";

function dashboardCntrl($log,$scope,socket,$timeout,$location,$rootScope,User){
	$log.info("In dashboardCntrl");
	if(!User.isValidUser()){
		User.redirectToLogin();
	}
	if(!angular.equals("/login",$location.absUrl().split('#')[1])){
		angular.element('#headerMenuBar').css({display: 'block'});
		angular.element('#main-menu-toggle').css({display: 'block'});
		angular.element('#widgets-area-button').css({display: 'block'});
		angular.element('#sidebar-left').css({display: 'block'});
	}
	
	$scope.loggedInTimer = "00:00:00";
	var timeObject = new Date;
	/**Start: Generate random data for loggedInTimer**/
	$scope.updateLoggedInTimer = function(){
		var dateObj = new Date;
		$scope.loggedInTimer = (timeObject.getHours() - dateObj.getHours())+" : "+(timeObject.getMinutes() - dateObj.getMinutes())+" : "+(timeObject.getSeconds() - dateObj.getSeconds());
		$timeout($scope.updateLoggedInTimer,1000);
	};
	$timeout($scope.updateLoggedInTimer,1000);
	//End: Generate random data for loggedInTimer
	
	socket.on('activeUsers',function(data){				
		$log.info("active users 1 " + data.activeUsers);
		_activeUsers.push(data.activeUsers);
		$log.info(_activeUsers);
		$scope.realTimeChartData = generateRealTimeChartData(data);
		//$scope.realTimeChartData = _activeUsers;
		$scope.circleChartData = generateCircleChartData(data);
		
	});
	
	socket.on('analyticsData',function(data){
		$log.info("socket");
		$log.info(data.analyticsData.activeUsers);
		$log.info(angular.toJson(data.analyticsData));
	});
	
	/**method for generating the realtime json object**/
	$scope.setRealTimeData(generateRealTimeData());	
	$log.info($scope.getRealTimeData());

	/**Start: Generate random data for RealTime Json Object**/
	$scope.updateRealTimeData = function(){
		$scope.setRealTimeData(generateRealTimeData());		
		//$scope.circleChartData = generateCircleChartData($scope.getRealTimeData());
		//$scope.realTimeChartData = generateRealTimeChartData($scope.getRealTimeData());
		$timeout($scope.updateRealTimeData,1000);
	};
	$timeout($scope.updateRealTimeData,1000);
	/**End: Generate random data for RealTime Json Object**/
	
	$scope.verticalChartInputs = generateVerticalStatusData();	
	$scope.browserUsingStatus = generateRealTimeBrowserData();
	
	/**Start: Generate random data for browserUsingStatus**/
	$scope.updateBrowserUsingStatusData = function(){
		$scope.browserUsingStatus = generateRealTimeBrowserData();
		$timeout($scope.updateBrowserUsingStatusData,12000);
	};
	$timeout($scope.updateBrowserUsingStatusData,12000);
	/**End: Generate random data for browserUsingStatus**/
	
	/**Start: Generate random data for verticalChartInputs**/
	$scope.updateVerticalChartData = function(){
		$scope.verticalChartInputs = generateVerticalStatusData();
		$timeout($scope.updateVerticalChartData,8000);
	};
	$timeout($scope.updateVerticalChartData,8000);
	/**End: Generate random data for verticalChartInputs**/
	
}


function dashboardHistoryCntrl($log,$scope,$timeout,$location,$rootScope,User){
	$log.info("In dashboardHistoryCntrl");	
	if(!User.isValidUser()){
		User.redirectToLogin();
	}
	
	if(!angular.equals("/login",$location.absUrl().split('#')[1])){
		angular.element('#headerMenuBar').css({display: 'block'});
		angular.element('#main-menu-toggle').css({display: 'block'});
		angular.element('#widgets-area-button').css({display: 'block'});
		angular.element('#sidebar-left').css({display: 'block'});
	}
		
	$scope.statusChartInputs = generateChartData();	
	$scope.verticalChartInputs = generateVerticalStatusData();	
	$scope.browserUsingStatus = generateRealTimeBrowserData();
	

	/**Start: Generate random data for browserUsingStatus**/
	$scope.updateBrowserUsingStatusData = function(){
		$scope.browserUsingStatus = generateRealTimeBrowserData();
		$timeout($scope.updateBrowserUsingStatusData,12000);
	};
	//$timeout($scope.updateBrowserUsingStatusData,12000);
	/**End: Generate random data for browserUsingStatus**/
	
	/**Start: Generate random data for verticalChartInputs**/
	$scope.updateVerticalChartData = function(){
		$scope.verticalChartInputs = generateVerticalStatusData();
		$timeout($scope.updateVerticalChartData,8000);
	};
	//$timeout($scope.updateVerticalChartData,8000);
	/**End: Generate random data for verticalChartInputs**/
	
	/**Start: Generate random data for statusChartInputs**/
    $scope.updateChartData = function(){
    	$scope.statusChartInputs = generateChartData();
    	$timeout($scope.updateChartData,4000);
    };
    //$timeout($scope.updateChartData,4000);
	/**End: Generate random data for statusChartInputs**/
}