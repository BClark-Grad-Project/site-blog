var Comment = require('./../config').comment;

module.exports = function(search, updateData, cb){	
	Comment.findOneAndUpdate(search, updateData, {}, function(err, comment){
		if(err){return cb(err, null);}
		return cb(null, comment.getData());
	});
};