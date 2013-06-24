jQ(function(){ 
	var value = "";

	/*jQ.getJSON('http://localhost:3000/test/rule.json',function(data){		
		console.log("in getJSON");
		value = data.domElement.value;
		console.log(value);
	});*/

	/*jQ.ajax({
    type: 'GET',
    url: 'http://localhost:3000/test/rule.json',
    async: false,
    jsonpCallback: 'jsonCallBack',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json) {
       console.log(json.domElement.value);
    },
    error: function(e) {
       console.log(e.message);
    }
});*/


	//console.log(jQ('h2[class = "product-name"]').text(0));
	jQ('h2[class = "product-name"]').each(function(index){
		if(jQ(this).text() =='CN Clogs Beach/Garden Clog')
			jQ(this).bind("click",function(e){
				e.stopPropagation();
				console.log("sending socket");
			});
	});	
});