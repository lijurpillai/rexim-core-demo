"use strict";

function mainMenuCntrl($log,$scope,$location){
	$log.info("In mainMenuCntrl");
	
	$scope.getDashboardclassName = function(){
		if(angular.equals("/dashboard",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getInfrastructureClassName = function(){
		if(angular.equals("/infrastructure",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getMessageClassName = function(){
		if(angular.equals("/messages",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
}

function dashboardCntrl($log,$scope,$timeout){
	$log.info("In dashboardCntrl");
		
	$scope.statusChartInputs = generateChartData();
	
	$scope.verticalChartInputs = generateVerticalStatusData();
	
	$scope.browserUsingStatus = generateRealTimeBrowserData();
	
	$scope.realTimeChartData = generateRealTimeChartData();
	
	
	/**Start: Generate random data for realTimeChartData**/
	$scope.updateRealTimeChartData = function(){
		$scope.realTimeChartData = generateRealTimeChartData();
		$timeout($scope.updateRealTimeChartData,8000);
	};
	$timeout($scope.updateRealTimeChartData,8000);
	/**End: Generate random data for realTimeChartData**/

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
	
	/**Start: Generate random data for statusChartInputs**/
   /* $scope.updateChartData = function(){
    	$log.info("In updateChartData");
    	$scope.statusChartInputs = generateChartData();
    	$log.info($scope.statusChartInputs);
    	$timeout($scope.updateChartData,4000);
    };
    $timeout($scope.updateChartData,4000);*/
	/**End: Generate random data for statusChartInputs**/
}

function infrastructureCntrl($log,$scope,$timeout){
	$log.info("In infrastructureCntrl");
	
	$scope.activeUserData = {"users":150,"data":getRandomData(150)};
	$scope.serverData = {"users":200,"data":getRandomData(200)};
	$scope.activeUsersCircleChart = generateActiveUsersCircleChartData();
	
	/**Start: Generate random data for activeUserData**/
	$scope.updateRealTimeChartData = function(){
		$scope.activeUserData = {"users":150,"data":getRandomData(150)};
		$timeout($scope.updateRealTimeChartData,8000);
	};
	$timeout($scope.updateRealTimeChartData,8000);
	/**End: Generate random data for activeUserData**/
	
	/**Start: Generate random data for serverData**/
	$scope.updateRealTimeServerChartData = function(){
		$scope.serverData = {"users":200,"data":getRandomData(200)};
		$timeout($scope.updateRealTimeServerChartData,2000);
	};
	$timeout($scope.updateRealTimeServerChartData,2000);
	/**End: Generate random data for serverData**/
	
	/**Start: Generate random data for activeUsersCircleChart**/
	$scope.updateActiveUseCircleChartData = function(){
		$scope.activeUsersCircleChart = generateActiveUsersCircleChartData();
		$timeout($scope.updateActiveUseCircleChartData,1000);
	};
	$timeout($scope.updateActiveUseCircleChartData,1000);
	/**End: Generate random data for activeUsersCircleChart**/
}

function messageCntrl($log,$scope,$timeout){
	$log.info("In messageCntrl");
}

function loginCntrl($log,$scope,$timeout,$location){
	$log.info("In loginCntrl");	
	if(angular.equals("/login",$location.absUrl().split('#')[1])){
		$log.info("Clicked Login");
		angular.element('#headerMenuBar').css({display: 'none'});
		angular.element('#main-menu-toggle').css({display: 'none'});
		angular.element('#widgets-area-button').css({display: 'none'});
		angular.element('#sidebar-left').css({display: 'none'});
	}else{
		angular.element('#headerMenuBar').css({display: 'block'});
		angular.element('#main-menu-toggle').css({display: 'block'});
		angular.element('#widgets-area-button').css({display: 'block'});
		angular.element('#sidebar-left').css({display: 'block'});
	}
}