var Comment = require('./../config').comment;

module.exports = function(commentObj, cb){
    if(!commentObj.id){                  return cb('!No Blog to add Comment', null);}
    if(!commentObj.comment.author){      return cb('!No Comment Author', null);}
    if(!commentObj.comment.description){ return cb('!No Comment Content', null);}

    var blog        = commentObj.comment.blog;
    var author      = commentObj.comment.author;
    var description = commentObj.comment.description;
    
    var written     = commentObj.comment.written ? commentObj.written : new Date();
    
	var comment = new Comment({
	    blog:        blog,
        author:      author,
        description: description,
	    written:     written
	});	
	
	comment.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, comment.getData());
    });
};