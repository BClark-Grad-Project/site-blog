var Blog = require('./blog');
var Comment= require('./comment');

module.exports.blog    = Blog;
module.exports.comment = Comment;

module.exports = function(blogObj, cb){
	if(blogObj.article){
		//
	} else if(blogObj.comment){
		//
	} else {
		return cb('!No Item', null);
	}
};
