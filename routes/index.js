
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.chat = function(req, res){
	  
	  console.log("inside chat ------>");  
	  console.log(req.query["clientId"]);
	  res.render('chat',{clientId:req.query["clientId"]});	 
};