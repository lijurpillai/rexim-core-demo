myModule.service('FetchData',function($http,$log){
	this.getData = function(){
		$http.get('../MyAngularJs/phones/phones.json').success(function(data){
	        $log.info('In FetchData: ');
	        $log.info(data);
	        return data;
	    });
	};
});