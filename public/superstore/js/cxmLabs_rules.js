jQ(function(){ 
 
  console.log("browser fingerprint rules page " + _fingerPrint.get()); 

  //***  RuleData constructor ***//
  function RuleData(custId,apiKey,version,ruleId){
    this.ruleId = ruleId;
    this.custId = custId;
    this.apiKey = apiKey;
    this.version = version;    
    this.trackingId = _fingerPrint.get();
    this.userId = getUserId();
    this.clientId = "";            
  }
  RuleData.prototype ={
    constuctor : RuleData,
    getCustId : function(){
      alert(this.custId);
    }
  };
 //** RuleData Const ends **//

 //**Rule constructor**//
	function RuleDetails(ruleId){    	
    	this.ruleType = getRuleDetails(ruleId).rtype;
    	this.ruleDec =  getRuleDetails(ruleId).rdesc;   	    	   
      }  



    /** Rule 0001 - No results found
    **  In "catalogsearch/result/" page when ".note-msg" == "Your search returns no results."
    **  then no results found for product "?q="
    **/

    if(window.location.pathname == "/catalogsearch/result/")
    {   var ruleId = "0001";
		console.log("inside rule " + ruleId);
    	if(jQ('.note-msg').text().trim() == 'Your search returns no results.'){
    		var ruleData = new RuleData("owaCustomer1","apiKEY" , "1.0",ruleId );
    		ruleData.ruleDetails = new RuleDetails(ruleId);
    		ruleData.ruleDetails.searchParam = window.location.search; // add params
    		console.log(ruleData );
    		socket.emit('noResultsFound',ruleData);
       	}   		
    }
    /** Rule 0001 ends **/

    /** Rule 0002 - Coupon code error
    **  In "catalogsearch/result/" page when ".note-msg" == "Your search returns no results."
    **  then no results found for product "?q="
    **/

     if(window.location.pathname == "/checkout/cart/")
     {
     	var ruleId = "0002";
     	var triggerPrice = 2000;
     	console.log("inside rule " + ruleId);
     	// getting subtotal element
     	var subtotalElem = jQ('#shopping-cart-totals-table tbody span.price').text(); 
        // remove ',' and convert to  int.	
     	var subtotal = parseFloat(subtotalElem.substring(2).replace(/\,/g,'')); 
     	console.log(subtotal);
     	// if error on apply coupon and subtotal > trigger price
     	if((jQ('.error-msg').length > 0)&&(subtotal>triggerPrice)){
     		console.log("activating rule 0002");
     		var ruleData = new RuleData("owaCustomer1","apiKEY" , "1.0",ruleId );
     		ruleData.ruleDetails = new RuleDetails(ruleId);
     		console.log(ruleData);
     		socket.emit('couponError',ruleData);
     		
     	}
     }

     


	//console.log(jQ('h2[class = "product-name"]').text(0));
	jQ('h2[class = "product-name"]').each(function(index){
		if(jQ(this).text() =='CN Clogs Beach/Garden Clog')
			jQ(this).bind("click",function(e){
				e.stopPropagation();
				console.log("sending socket");
			});
	});	

	//** Utils **//
	function getUserId(){  // get user id from screen
      var userId = "";        
      userId = jQ('.welcome-msg').text();
      return userId;
  	}

  	function getRuleDetails(ruleId) {
    	switch(ruleId)
    	{
    		case "0001":
    		 return {rtype :"No Results Found" , rdesc : "Prod search returns no result"};
    		case "0002":
    		 return {rtype :"Coupon Error" , rdesc : "Coupon error with subtotal greter than 2000"};
    		default: return {rtype :"" , rdesc : ""};
    	}
    }

});