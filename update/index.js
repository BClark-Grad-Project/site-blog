var Blog    = require('./blog');
var Comment = require('./comment');

var merge = function(obj1,obj2){
    var obj3 = {};
    for (var attr1 in obj1) { obj3[attr1] = obj1[attr1]; }
    for (var attr2 in obj2) { obj3[attr2] = obj2[attr2]; }
    return obj3;
};

module.exports.blog    = Blog;
module.exports.comment = Comment;

module.exports = function(blogObj, cb){
	if(blogObj.article){
		var search = {_id:blogObj.id};		
		delete blogObj.id;
		var update     = blogObj.article;
		delete blogObj.article;
		update = merge(update, blogObj);
		
		// Update blog item.
		Blog(search, update, function(err, data){
			if(err){return cb(err, null);}
			
			return cb(null, data);
		});
	} else if(blogObj.comment){
		var search = {_id:blogObj.comment.id};		
		delete blogObj.comment.id;
		
		// Update comment item
		Comment(search, blogObj.comment, function(err, data){
			if(err){return cb(err, null);}
			
			return cb(null, data);
		});		
	} else {
		return cb('!No UPDATE Item', null);
	}
};
