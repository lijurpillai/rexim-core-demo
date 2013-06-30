function mainMenuCntrl($log,$scope,$location){
	$log.info("In mainMenuCntrl");
	
	$scope.getDashboardclassName = function(){
		if(angular.equals("/dashboard",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getDashboardRealTimeclassName = function(){
		if(angular.equals("/dashboard_realtime",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getDashboardHistoryclassName = function(){
		if(angular.equals("/dashboard_history",$location.absUrl().split('#')[1])){
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

	$scope.getActionTableClassName = function(){
		if(angular.equals("/actiontable",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
}