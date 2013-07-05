"use strict";

function indexCntrl($log,socket,$scope,$rootScope,$timeout,$location,$window){
	$log.info("In indexCtrl");		

	socket.on('0001',function(data){				
		$log.info("inside no results found rule");
		$log.info(data.noResultsFound.length);
		$scope.results_count=getCount('0001',data.noResultsFound);
		//$scope.results_count = data.noResultsFound.length;						
		$scope.ruleData = data.noResultsFound;
		$scope.status = "Active";
	});

	socket.on('0002',function(data){

		$log.info("inside couponError rule");
		$log.info(data.couponError.length);	
		//$scope.errorCount = data.couponError.length;
		$scope.errorCount = getCount('0002',data.couponError);	
		$scope.ruleData = data.couponError;
		$scope.status = "Active";		

		});
	socket.on('0003',function(data){

		$log.info("inside a2c > 3000 alert");
		$log.info(data.a2cAlert.length);	
		//$scope.errorCount = data.a2cAlert.length;	
		$scope.a2c_Count = getCount('0003',data.a2cAlert);	
		$scope.ruleData = data.a2cAlert;
		$scope.status = "Active";		

		});
	$scope.toggleStatus = function(idIndex){
		
		var element = "#activityLabel" + idIndex;		
		console.log("inside toggle status" + element);
		if(angular.element( 'element').hasClass('label-success').toString()){
			console.log("inside toggle status IF" + element);
			angular.element('element').find('span').removeClass('label-success')
				.addClass('label-warning');	
		}
		
	};

	function getCount(ruleId,data){
		var count = 0;
		for (var i = 0; i < data.length; i++) {			
			if(data[i].ruleId == ruleId){	
				++count;
			}			
		};
		console.log("rule count" + count);
		return count;
	}

	/*function generateCircleChartData(data){	
	console.log('inside generateCircleChartData');
	console.log(data);

	return [{"count":generateRandomNumber(),"label":'TBD'},
	 {"count":generateRandomNumber(),"label":'TBD'}];
}*/

	$scope.chatStatus = function(data){
			return data.ruleDetails.chat;
		};
		$scope.offerStatus = function(data){
			return data.ruleDetails.offer;
		};	

	

	$scope.chat = function(clientId){
		var url = "/chat?clientId="+clientId;
		console.log("url--" + url);
		$window.open(url,clientId, 'width=500, height=600');
		
	};

	$scope.offerCode = function(clientId,offer){	
		console.log("clientId 2 --->" + clientId);	
		socket.emit('offerCode',{offer:offer,clientId:clientId});
	};

	$scope.showModal = function(clientId){
		console.log("inside show modal");
		$('#myModal').modal('show');
		console.log(clientId);
		$scope.modalClientId = clientId;
	};


}

function loginCntrl($log,$scope,$timeout,$location,$http,$rootScope){
	$log.info("In loginCntrl");
	if(sessionStorage){
		sessionStorage.clear('user');
	}
	if(angular.equals("/login",$location.absUrl().split('#')[1])){
		angular.element('#headerMenuBar').css({display: 'none'});
		angular.element('#main-menu-toggle').css({display: 'none'});
		angular.element('#widgets-area-button').css({display: 'none'});
		angular.element('#sidebar-left').css({display: 'none'});
	}

	$scope.loginAction = function(){
		$log.info("UserName: "+$scope.username);
		$log.info("UserPassword: "+$scope.userpassword);
		$scope.user;
		$http.get('js/app/dataproviders/loginDetails.json').success(function(data){
	        $scope.user = data;
	        if(angular.equals($scope.user.name,$scope.username) && angular.equals($scope.user.password,$scope.userpassword)){
	        	sessionStorage.setItem("user",angular.toJson($scope.user));
				$location.path('/dashboard_realtime');
				if(!$rootScope.$$phase){
	                $rootScope.$apply();
	            }
			}
	    });		
	};
}