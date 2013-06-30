
function generateRealTimeData(){
	return {'custId':'owaCustomer1','apiKey':'apiKEY','version':'1.0','trackingId':2680667829,'userId':'Default welcome msg! ','clientId':'kqZjEJ_EMfxgDwhOEjRG','pageData':{'url':'http://www.superstore.com:8081/','host':'www.superstore.com:8081','hostname':'www.superstore.com','hash':'','pathname':'/','params':'','navigatorVersion':'5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36','navigatorAgent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36','browserName':'Netscape','platform':'Win32','cookieEnabled':true,'referrer':''},'activeUsers':generateRandomNumber()};
}


function getRandomData(totalPoints){
	var data = [];
	if (data.length > 0)
		data = data.slice(1);
	// do a random walk
	while (data.length < totalPoints){
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
}

function generateRandomPercentage(){
	var num = (Math.floor( Math.random()* (1+40-20) ) )+ 20;
	if(num > 100)
		num = num/10;
	return num+"%";
}

function generateRealTimeChartData(data){
	return {"users":data.activeUsers,"data":getRandomData(data.activeUsers)};
}

function generateRealTimeBrowserData(){
	var bData = [{"name":"Chrome","users":generateRandomPercentage(),"icon_src":"img/browser-chrome-big.png"},{"name":"Mozilla","users":generateRandomPercentage(),"icon_src":"img/browser-firefox-big.png"},{"name":"InternetExoplorer","users":generateRandomPercentage(),"icon_src":"img/browser-ie.png"},{"name":"Safari","users":generateRandomPercentage(),"icon_src":"img/browser-safari.png"},{"name":"Opera","users":generateRandomPercentage(),"icon_src":"img/browser-opera.png"}];
	return bData;
}

function generateRandomNumber(){
	var num = (Math.floor( Math.random()* (1+40-20) ) )+ 20;
	if(num > 100)
		num = num/10;
	if(num < 30)
		num = num+20;
	return num;
}

function generateVerticalStatusData(){
	return [{"CN":"US","PER":generateRandomNumber()+'%'},{"CN":"PL","PER":generateRandomNumber()+'%'},{"CN":"GB","PER":generateRandomNumber()+'%'},{"CN":"DE","PER":generateRandomNumber()+'%'},{"CN":"NL","PER":generateRandomNumber()+'%'},{"CN":"CA","PER":generateRandomNumber()+'%'},{"CN":"FI","PER":generateRandomNumber()+'%'},{"CN":"RU","PER":generateRandomNumber()+'%'},{"CN":"AU","PER":generateRandomNumber()+'%'},{"CN":"IN","PER":generateRandomNumber()+'%'}];
}


function generateRandomTemperature(){
	return (Math.floor(Math.random()*(1+120)));
}

function generateActiveUsersCircleChartData(){
	return  [{"users":generateRandomNumber(),"label":"Active Users"},{"users":generateRandomNumber(),"label":"Users Logged Out"},{"users":generateRandomNumber(),"label":"New Users"},{"users":generateRandomNumber(),"label":"Connections Lost"}];
}


function generateTemperatureStatusChartData(){
	var bData = [{"temperature":generateRandomTemperature(),"componentName":"CPU Temperature"},{"temperature":generateRandomTemperature(),"componentName":"GPU Temperature"},{"temperature":generateRandomTemperature(),"componentName":"HDD Temperature"},{"temperature":generateRandomTemperature(),"componentName":"SDD Temperature"},{"temperature":generateRandomTemperature(),"componentName":"Memory Bank Temperature"},{"temperature":generateRandomTemperature(),"componentName":"Memory Controller Temperature"}];
	return bData;
}

function generateChartData(){
	
	var pageviews = new Array();
	var visits = new Array();
	var visitors = new Array();
	var newVisitors = new Array();
	
	for(var i=0 ; i < 30; i++){
		var pages = new Object(new Array(new Object(i),new Object(((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200)));
		var visit = new Object(new Array(new Object(i),new Object(((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200)));
		var visitor = new Object(new Array(new Object(i),new Object(((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200)));
		var newVisitor = new Object(new Array(new Object(i),new Object(((Math.floor( Math.random()* (1+40-20) ) ) + 20)* 1200)));
		pageviews[i] = pages;
		visits[i] = visit;
		visitors[i] = visitor;
		newVisitors[i] = newVisitor;
	}
	var chartInputs = new Object();
	chartInputs.pageviews = pageviews;
	chartInputs.visits = visits;
	chartInputs.visitors = visitors;
	chartInputs.newVisitors = newVisitors;
	return chartInputs;
}


var activeUsersCount;
function generateCircleChartData(data){
	var pageViewCount,usersLogOut = 0,newUsers = 0;
	if(!angular.equals(undefined,activeUsersCount)){
		if(activeUsersCount > data.activeUsers){
			usersLogOut = activeUsersCount - data.activeUsers;
		}else{
			newUsers = data.activeUsers - activeUsersCount;
		}
		
	}
	activeUsersCount = data.activeUsers;
	pageViewCount = generateRandomNumber();
	return [{"count": data.activeUsers,"label":"Active Users"},{"count":newUsers,"label":'New Users'},{"count":usersLogOut,"label":'User LoggedOut'}
	,{"count":pageViewCount,"label":'Page Views'},{"count":generateRandomNumber(),"label":'TBD'},{"count":generateRandomNumber(),"label":'TBD'}];
}

function generateActiveUsersCountData(data){
	return  [];
}
