jQ(function(){ 


  var url = 'http://localhost:3000/';
  var socket = io.connect(url);  
  var _fingerPrint = new Fingerprint();
  console.log("browser fingerprint " + _fingerPrint.get()); 
  
  var custId = "owaCustomer1";
  var adminClientId = "";   
  console.log(document.cookie);
  //if (document.cookie) {};


//  AnalyticsData constructor
  function AnalyticsData(custId,apiKey,version){
    this.custId = custId;
    this.apiKey = apiKey;
    this.version = version;
    this.anonymousUserId = _fingerPrint.get();
    this.loggedUserId = "";
    this.clientId = "";
    this.pageData = {};

    /*this.pageData.url = window.location.href;
    this.pageData.referrer = document.referrer;*/    
  }
  AnalyticsData.prototype ={
    constuctor : AnalyticsData,
    getCustId : function(){
      alert(this.custId);
    }
  };
 	// Const ends

  socket.on('error', function (reason) {
    console.log(reason);
    if(reason =='handshake error'){
     var o={}
     o.img= new Image()
     o.img.src="http://localhost:3000/keepsession.gif?"+((new Date).getTime())
     o.img.onload=function(){setTimeout(function(){delete o.img;delete o;},0);}
     var socket = io.connect(url);   

    }
    console.log('unable to connect to namespace', reason);
  });

  socket.on('connect', function () 
  { 
    
    var analyticsData = new AnalyticsData("owaCustomer1","apiKEY" , "1.0");
    analyticsData.pageData.url = window.location.href;
    analyticsData.pageData.host = window.location.hostname;
    analyticsData.pageData.hash = window.location.hash;
    analyticsData.pageData.pathname = window.location.pathname;

    analyticsData.pageData.referrer = document.referrer;
    console.log(JSON.stringify(analyticsData));
    
     // socket.emit('setCust', { custKey: 'owaCustomer1' });
      socket.emit('analyticsData',analyticsData); // send page data
   });

   /*window.onhashchange = function () {
       socket.emit('analyticsData',analyticsData); // send page data  
   } */       
      
    socket.on('error', function (reason){
      console.error('Unable to connect Socket.IO', reason);
    });  
});