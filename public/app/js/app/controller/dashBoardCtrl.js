"use strict";

// sallap function dashboardCntrl($log,$scope,$timeout,$location,User,ActiveUserData,PageViewData,BrowserData){
function dashboardCntrl($log,$scope,$timeout,$location,$rootScope,socket,User,ActiveUserData,PageViewData,BrowserData){
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
	
	if($rootScope.masterActiveUserData){

		if(!$scope.activeUsers){
			$scope.activeUsers =ActiveUserData.
						getActiveUsersCount($rootScope.masterActiveUserData.activeUsers);
		}
		if(!$scope.realTimeChartData){		
			$scope.realTimeChartData =ActiveUserData.
						getActiveUsersRealTimeChartData($rootScope.masterActiveUserData.activeUsers);		
		}
	}
	if($rootScope.masterPageViewData){
		
		if(!$scope.pageViewCount){
			$scope.pageViewCount = PageViewData.getPageViewsCount($rootScope.masterPageViewData);
		}		
	}
	
	$scope.loggedInTimer = "00:00:00";
	var timeObject = new Date;
	/**Start: Generate random data for loggedInTimer**/
	$scope.updateLoggedInTimer = function(){
		var dateObj = new Date;
		$scope.loggedInTimer = (timeObject.getHours() - dateObj.getHours())+" : "+(timeObject.getMinutes() - dateObj.getMinutes())+" : "+(timeObject.getSeconds() - dateObj.getSeconds());
		$timeout($scope.updateLoggedInTimer,1000);
	};
	//$timeout($scope.updateLoggedInTimer,1000);
	/**End: Generate random data for loggedInTimer*/
	
	socket.on('activeUsers',function(data){				
		$log.info("active users 1 " + data.activeUsers);
		/*_activeUsers.push(data.activeUsers);
		$log.info(_activeUsers);*/
		//$scope.realTimeChartData = generateRealTimeChartData(data);
		//$scope.realTimeChartData = _activeUsers;
		//$scope.circleChartData = generateCircleChartData(data);
		$rootScope.masterActiveUserData = data;
		$scope.activeUsers = ActiveUserData.getActiveUsersCount(data.activeUsers);
		$scope.realTimeChartData = ActiveUserData.getActiveUsersRealTimeChartData(data.activeUsers);

		
	});
	
	socket.on('analyticsData',function(data){
		$log.info("inside analyticsData");
		$rootScope.masterPageViewData = data;
		$scope.pageViewCount = PageViewData.getPageViewsCount(data);
		$scope.circleChartData = generateCircleChartData();
		$scope.browserUsingStatus = BrowserData.getRealTimeBrowserData();
		$scope.verticalChartInputs = PageViewData.getEachPageViewsCount(data);
	});
	
	
	/**Sallap --Start: Method for generating the realtime json object**/
	/*$scope.setRealTimeData(generateRealTimeData());	
	$log.info($scope.getRealTimeData());*/
	/**End: Method for generating the realtime json object**/

	/**Start: Generate random data for RealTime Json Object**/
	/*$scope.updateRealTimeData = function(){
		$scope.setRealTimeData(generateRealTimeData());
		$scope.activeUsers = ActiveUserData.getActiveUsersCount($scope.getRealTimeData().activeUsers);
		$scope.pageViewCount = PageViewData.getPageViewsCount($scope.getRealTimeData());
		$scope.circleChartData = generateCircleChartData(); // tbd
		$scope.realTimeChartData = ActiveUserData.getActiveUsersRealTimeChartData($scope.getRealTimeData().activeUsers);
		$scope.browserUsingStatus = BrowserData.getRealTimeBrowserData();
		$scope.timmerId = $timeout($scope.updateRealTimeData,1000);
	};
	$scope.timmerId = $timeout($scope.updateRealTimeData,1000);*/
	/**End: Generate random data for RealTime Json Object**/
	
//	$scope.verticalChartInputs = PageViewData.getEachPageViewsCount($scope.getRealTimeData());
	
	/**Start: Generate random data for verticalChartInputs**/
	/*$scope.updateVerticalChartData = function(){
		$scope.verticalChartInputs = PageViewData.getEachPageViewsCount($scope.getRealTimeData());
		$timeout($scope.updateVerticalChartData,8000);
	};
	$timeout($scope.updateVerticalChartData,8000);*/
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