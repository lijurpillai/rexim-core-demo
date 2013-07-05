"use strict";

var uiDataService = angular.module('UiDataService',[]);

uiDataService.service("UtilServices",function($log){
	
	this.getRandomChartData = function(limit){
		var data = [];
		if (data.length > 0)
			data = data.slice(1);
		// do a random walk
		while (data.length < limit){
			var prev = data.length > 0 ? data[data.length - 1] : 50;
			var y = prev + Math.random() * 10 - 5;
			if (y < 0)
				y = 0;
			if (y > 100)
				y = 100;
			data.push(y);
		}
		// zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < data.length; ++i){
			res.push([i, data[i]]);
		}
		return res;
	};
	
	this.generateRandomNumber = function(){
		var num = (Math.floor( Math.random()* (1+40-20) ) )+ 20;
		if(num > 100)
			num = num/10;
		if(num < 30)
			num = num+20;
		return num;
	};
	
	this.generateRandomPercentage = function (){
		var num = (Math.floor( Math.random()* (1+40-20) ) )+ 20;
		if(num > 100)
			num = num/10;
		return num+"%";
	};
	
});

uiDataService.service("ActiveUserData",function($log,UtilServices){
	var activeUsersCount = 0;
	this.getActiveUsersCount = function(userCount){
		var usersLogOut = 0,newUsers = 0;
		if(!angular.equals(undefined,userCount)){
			if(activeUsersCount > userCount){
				usersLogOut = activeUsersCount - userCount;
			}else{
				newUsers = userCount - activeUsersCount;
			}
			
		}else{
			userCount = 0;
		}
		activeUsersCount = userCount;
		if(userCount>=0){
			userCount = userCount-1;
		}
		//return [{"count": userCount,"label":"Active Users"},{"count":newUsers,"label":'New Users'},{"count":usersLogOut,"label":'User LoggedOut'}];
		return [{"count": userCount,"label":"Active Users"}];
	};
	
	this.getActiveUsersRealTimeChartData = function(count){
		return {"users":count,"data":UtilServices.getRandomChartData(count)};
	};
	
});


uiDataService.service("PageViewData",function($log,UtilServices){
	var pageViewCount = 0;
	var homepageViewCount = 0;
	var searchResultsPage = 0;
	var otherPage = 0;
	var accountPage = 0;
	var productFurniture=0;
	var productAnashiraOffer = 0;
	var checkoutPageCart = 0;
	var productElectronics = 0;
	var productApparel = 0;
	var checkoutProceed = 0;
	//var pageViewCount = UtilServices.generateRandomNumber();
	this.getPageViewsCount = function(pageViewData){

		if(!angular.equals(undefined,pageViewData.analyticsData.pageData) && 
				!angular.equals(undefined,pageViewData.analyticsData.pageData.pathname)){
			$log.info("inside getPageViewsCount");
			pageViewCount++;
		}
		return pageViewCount;
	};
	
	this.getEachPageViewsCount = function(pageViewData){
		
		$log.info("page path ---");
		
		if(!angular.equals(undefined,pageViewData.analyticsData.pageData) && 
				!angular.equals(undefined,pageViewData.analyticsData.pageData.pathname)){
			var pathName = pageViewData.analyticsData.pageData.pathname;
			$log.info(pathName);
				switch(pathName)
				{
				case "/":
				  homepageViewCount++;					  
				  break;
				case "/catalogsearch/result/":
				  searchResultsPage++;
				  break;
				 case "/customer/account/login/":
				  accountPage++;
				  break;
				 case "/furniture.html":
				  productFurniture++;
				  break;
				 case "/apparel/shoes/womens/anashria-womens-premier-leather-sandal.html":
				  productAnashiraOffer++;
				  break;
				 case "/checkout/cart/":
				  checkoutPageCart++;
				  break;
				 case "/electronics.html":
				  productElectronics++;
				  break;  
				 case "/apparel.html":
				  productApparel++;
				  break;
				  case "/checkout/onepage/":
				  checkoutProceed++;
				  break;
				default:
				  otherPage++;
				}
				
		}
		return [{"CN":"Home","PER":homepageViewCount},{"CN":"Search","PER":searchResultsPage}		
		,{"CN":"Furniture","PER":productFurniture},{"CN":"Special Offer","PER":productAnashiraOffer}
		,{"CN":"Account","PER":accountPage},{"CN":"Other","PER":otherPage}
		,{"CN":"Cart","PER":checkoutPageCart},{"CN":"Electronics","PER":productElectronics}
		,{"CN":"Apparel","PER":productApparel},{"CN":"Checkout","PER":checkoutProceed}];
	};
	
});

uiDataService.service("BrowserData",function($log,UtilServices){
	
	this.getRealTimeBrowserData = function(browserdata){
		return [{"name":"Chrome","users":UtilServices.generateRandomPercentage(),"icon_src":"img/browser-chrome-big.png"},
		             {"name":"Mozilla","users":UtilServices.generateRandomPercentage(),"icon_src":"img/browser-firefox-big.png"},
		             {"name":"InternetExoplorer","users":UtilServices.generateRandomPercentage(),"icon_src":"img/browser-ie.png"},
		             {"name":"Safari","users":UtilServices.generateRandomPercentage(),"icon_src":"img/browser-safari.png"},
		             {"name":"Opera","users":UtilServices.generateRandomPercentage(),"icon_src":"img/browser-opera.png"}];
	};
	
});
