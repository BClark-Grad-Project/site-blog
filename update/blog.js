var Blog = require('./../models/blog');

module.exports = function(search, updateData, cb){	
	Blog.findOneAndUpdate(search, updateData, {}, function(err, blog){
		if(err){return cb(err, null);}
		return cb(null, blog.getData());
	});
};