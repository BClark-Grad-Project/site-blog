var Blog = require('./../models/blog');

module.exports.top = function(count, type, cb){
	Blog
		.find({active:true, type:type})
		.sort({'notice.visits': -1})
		.limit(count)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No blogs found', null);}
			
			var blogs = [];
			for(i in data){
				blogs[i] = data[i].getData();
			}
			
			return cb(null, blogs);
		});	
};

module.exports.recent = function(count, type, cb){
	Blog
		.find({active:true, type:type})
		.sort({written: -1})
		.limit(count)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No blogs found', null);}
			
			var blogs = [];
			for(i in data){
				blogs[i] = data[i].getData();
			}
			
			return cb(null, blogs);
		});	
};

module.exports.search = function(search, cb){
	Blog
		.findOne(search)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No blog found', null);}
			
			return cb(null, data.getData());
		});	
};