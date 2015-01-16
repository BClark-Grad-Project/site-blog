var Blog = require('./../models/blog');

module.exports = function(blogObj, cb){
	Blog
		.findOne(blogObj)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No blog found', null);}
			
			return cb(null, data.getData());
		});	
};