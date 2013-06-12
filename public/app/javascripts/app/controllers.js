'use strict';

function MainCtrl($scope,socket,dataBinding) {
	var dashBrdData = {};
	
	$scope.conn = dataBinding.get().conn ;
	$scope.offer = dataBinding.get().offer ;
	$scope.pymtError = dataBinding.get().pymtError;

	socket.on('pageview',function(connData){			 
        	 console.log("inside pageview --- > " + connData.conn);  
        	 dashBrdData.conn = connData.conn-1; // compensate for the admin user -- bad logic   
        	 dataBinding.set(dashBrdData); 
        	 $scope.conn = dataBinding.get().conn ;        	 
    })	

	socket.on('offerview',function(offerData){	
	        	console.log("inside offerview --- > " + offerData.offer);   
	        	 dashBrdData.offer = offerData.offer;
        	 	 dataBinding.set(dashBrdData); 
        	 	 $scope.offer = dataBinding.get().offer ; 
    })

	socket.on('pymtError',function(pymtData){	
	        	console.log("inside pymtError --- > " + pymtData.errorCount); 	        	
	        	dashBrdData.pymtError = pymtData.errorCount;
	        	dashBrdData.pymtErrorData = pymtData.pymtErrorData;
        	 	dataBinding.set(dashBrdData); 
        	 	$scope.pymtError = dataBinding.get().pymtError ; 
    })
    	
}	

function PieCtrl($scope,$http) {
	$http.get("testdata/pageView.json").success(function(data) {
	  console.log(data);		  	
	  $scope.pageViewData = data;
	  console.log("chart");
	});
}

function ErrCtrl(socket,dataBinding,$scope,$window) {

	console.log(dataBinding.get().pymtErrorData);
	 $scope.pymtErrorData = dataBinding.get().pymtErrorData;
	/*socket.on('pymtError',function(pymtData){	

	});*/

	$scope.chat = function(clientId){
		var url = "/chat?clientId="+clientId;
		console.log("url--" + url);

		$window.open(url,clientId, 'width=500, height=600');
		
	};

	$scope.showModal = function(clientId){
		$('#myModal').modal('show');
		console.log(clientId);
		$scope.modalClientId = clientId;
	};
	$scope.offerCode = function(clientId,offer){	
		console.log("clientId 2 --->" + clientId);	
		socket.emit('offerCode',{offer:offer,clientId:clientId});
	};

}
