var Blog = require('./blog');
var Comment= require('./comment');

module.exports.blog    = Blog;
module.exports.comment = Comment;

module.exports = function(search, cb){
	if(search){
		// Read blog and comments.
		Blog(search, function(err, blog){
			if(err){return cb(err, null);}
			
			var blogId = blog.edit.id ? blog.edit.id : blog.id;
			Comment({blog: blogId, active:true}, function(err, comments){
				if(err){return cb(err, null);}
				
				if(comments){
					blog.comment = comments;
				}
				return cb(null, blog);
			});
		});
	} else {
		return cb('!No READ Item', null);
	}
};
