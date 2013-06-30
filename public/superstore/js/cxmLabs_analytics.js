jQ(function(){ 


  
  _fingerPrint = new Fingerprint();
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
    this.trackingId = _fingerPrint.get();
    this.userId = getUserId();
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
//    analyticsData.userId = getUserId();
    analyticsData.pageData.url = window.location.href;
    analyticsData.pageData.host = window.location.host;
    analyticsData.pageData.hostname = window.location.hostname
    analyticsData.pageData.hash = window.location.hash;
    analyticsData.pageData.pathname = window.location.pathname;
    analyticsData.pageData.params = window.location.search;
    analyticsData.pageData.navigatorVersion = navigator.appVersion;
    analyticsData.pageData.navigatorAgent = navigator.userAgent;
    analyticsData.pageData.browserName = navigator.appName;
    analyticsData.pageData.platform = navigator.platform;
//    analyticsData.pageData.geoLocation = navigator.geolocation.getCurrentPosition();
    analyticsData.pageData.cookieEnabled = navigator.cookieEnabled;

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

    function getUserId(){
      var userId = "";
      /*if(jQ('.quick-access .last ').find('a:first').text() == "Log Out"){
        userId = jQ('.welcome-msg').text();
        console.log("user id --> " + userId);
      }  */   
      userId = jQ('.welcome-msg').text();
      return userId;
    }
});