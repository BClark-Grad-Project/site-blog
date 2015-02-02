// Get the database(db) configuration & functions.
var db = require('./config');

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

db.open();

module.exports.create = function(blogObj, cb){
	console.log('site-blog', blogObj);
	C(blogObj, function(err, data){
	  if(err){return cb(err, null);}
	  
	  // If creating a blog entry because of an edit deactivate the last entry.
	  if(blogObj.hasOwnProperty('id') && blogObj.hasOwnProperty('article')){
		  U({_id:blogObj.id}, {active:false}, function(fail, sucess){
			  if(fail){return cb(fail, null);}
			  
			  R.comment({blog: blog.edit.id}, function(err, comments){
				  if(err){return cb(err, null);}
				  
				  if(comments){
					  data.comment = comments;
				  }
				  return cb(null, data); 
			  });
		  });
	  } else {
		  return cb(null, data); 
	  }
	});
};

module.exports.read = function(id, cb){
	console.log('site-blog', id);
	R.find({_id: id}, function(err, data){
	  if(err){return cb(err, null);}
	
	  return cb(null, data);
	});
};

module.exports.update = function(blogObj, cb){
	console.log('site-blog', blogObj);
	U(blogObj, function(err, data){
	  if(err){return cb(err, null);}
	  
	  R.find({_id:data.id}, function(err, blog){
		  if(err){return cb(err, null);}
		  
		  return cb(null, blog); 
	  });
	});
};

module.exports.remove = function(id, cb){
	console.log('site-blog', id);
	U({id:id, article:{active: false}}, function(err, data){
	  if(err){return cb(err, null);}
	  
	  return cb(null, 'Article Deactivated');
	});
};

module.exports.top = function(count, type, cb){
	console.log('site-blog', 'top ' + count + ' ' + type + ' articles');
	R.blog.top(count, type, function(err, data){
		if(err){return cb(err, null);}
		return cb(null, data);
	});
};

module.exports.recent = function(count, type, cb){
	console.log('site-blog', 'recent ' + count + ' ' + type + ' articles');
	R.blog.recent(count, type, function(err, data){
		if(err){return cb(err, null);}
		return cb(null, data);
	});
};
