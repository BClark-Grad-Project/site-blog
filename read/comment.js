var Comment = require('./../config').comment;

module.exports = function(commentObj, cb){
	Comment
		.find(commentObj)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No comments found', null);}
			
			for(var i in data){
				data[i] = data[i].getData();
			}
			return cb(null, data);
		});	
};