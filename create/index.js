var Blog = require('./blog');
var Comment= require('./comment');

module.exports.blog    = Blog;
module.exports.comment = Comment;

module.exports = function(blogObj, cb){
	if(blogObj.article){
		// Create Blog Article
		Blog(blogObj, function(err, blog){
			console.log(err, blog);
			if(err){return cb(err, null);}
			return cb(null, blog);
		});
	} else if(blogObj.comment){
		// Add Comment to Blog
		var blog = {id:blogObj.comment.blog};
		Comment(blogObj, function(err, comment){
			if(err){return cb(err, null);}
			blog.comment = comment;
			return cb(null, blog);
		});
	} else {
		return cb('!No CREATE Item', null);
	}
};
