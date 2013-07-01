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
		return [{"count": userCount,"label":"Active Users"},{"count":newUsers,"label":'New Users'},{"count":usersLogOut,"label":'User LoggedOut'}];
	};
	
	this.getActiveUsersRealTimeChartData = function(count){
		return {"users":count,"data":UtilServices.getRandomChartData(count)};
	};
	
});


uiDataService.service("PageViewData",function($log,UtilServices){
	var pageViewCount = 0;
	var homepageViewCount = 0;
	//var pageViewCount = UtilServices.generateRandomNumber();
	this.getPageViewsCount = function(pageViewData){
		if(!angular.equals(undefined,pageViewData.pageData) && !angular.equals(undefined,pageViewData.pageData.pathname)){
			pageViewCount++;
		}
		return [{"count": pageViewCount,"label":"Page Views"}];
	};
	
	this.getEachPageViewsCount = function(pageViewData){
		var homepageViewCountPer = 0;
		if(!angular.equals(undefined,pageViewData.pageData) && !angular.equals(undefined,pageViewData.pageData.pathname)){
			if(angular.equals("/",pageViewData.pageData.pathname)){
				homepageViewCount++;
				homepageViewCountPer = homepageViewCount/100;
			}
		}
		return [{"CN":"Home","PER":homepageViewCountPer+"%"},{"CN":"PDP","PER":UtilServices.generateRandomPercentage()}
		,{"CN":"GB","PER":UtilServices.generateRandomPercentage()},{"CN":"DE","PER":UtilServices.generateRandomPercentage()}
		,{"CN":"NL","PER":UtilServices.generateRandomPercentage()},{"CN":"CA","PER":UtilServices.generateRandomPercentage()}
		,{"CN":"FI","PER":UtilServices.generateRandomPercentage()},{"CN":"RU","PER":UtilServices.generateRandomPercentage()}
		,{"CN":"AU","PER":UtilServices.generateRandomPercentage()},{"CN":"IN","PER":UtilServices.generateRandomPercentage()}];
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
