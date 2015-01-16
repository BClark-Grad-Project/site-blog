// Get the database(db) configuration & functions.
var db = require('./config');

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

module.exports.create = function(blogObj, cb){
	console.log('site-blog', blogObj);
	db.open();
	C(blogObj, function(err, data){
	  if(err){return cb(err, null);}
	  
	  // If creating a blog entry because of an edit deactivate the last entry.
	  if(blogObj.id && blogObj.article){
		  U({_id:blogObj.id}, {active:false}, function(fail, sucess){
			  if(fail){return cb(fail, null);}
			  R.comment({blog: blog.edit.id}, function(err, comments){
				  db.close();
				  if(err){return cb(err, null);}
				  if(comments){
					  data.comment = comments;
				  }
				  return cb(null, data); 
			  });
		  });
	  } else {
		  db.close();
		  return cb(null, data); 
	  }
	});
};

module.exports.read = function(id, cb){
	console.log('site-blog', id);
	db.open();
	R({_id: id}, function(err, data){
	  db.close();
	  if(err){return cb(err, null);}
	
	  return cb(null, data);
	});
};

module.exports.update = function(blogObj, cb){
	console.log('site-blog', blogObj);
	db.open();
	U(blogObj, function(err, data){
	  db.close();
	  if(err){return cb(err, null);}
	  
	  R({_id:data.id}, function(err, blog){
		  if(err){return cb(err, null);}
		  
		  return cb(null, blog); 
	  });
	});
};

module.exports.remove = function(id, cb){
	console.log('site-blog', id);
	db.open();
	U({id:id, article:{active: false}}, function(err, data){
	  db.close();
	  if(err){return cb(err, null);}
	  
	  return cb(null, 'Article Deactivated')
	});
};
