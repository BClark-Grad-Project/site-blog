// Get the database(db) configuration & functions.
var db = require('./config');

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

module.exports.create = function(userObj, cb){
	console.log('site-blog', userObj);
	db.open();
	C(userObj, function(err, data){
	  db.close();
	  if(err){return cb(err, null);}
	  
	  return cb(null, data);
	});
};

module.exports.read = function(search, cb){
	console.log('site-blog', search);
	db.open();
	R(search, function(err, data){
	  db.close();
	  if(err){return cb(err, null);}
	
	  return cb(null, data);
	});
};

module.exports.update = function(userObj, cb){
	console.log('site-blog', userObj);
	db.open();
	U(userObj, function(err, data){
	  db.close();
	  if(err){return cb(err, null);}
	
	  return cb(null, data);
	});
};

module.exports.remove = function(id, cb){
	console.log('site-blog', id);
	db.open();
	D(id, function(err, data){
	  db.close();
	  if(err){return cb(err, null);}
	
	  return cb(null, data);
	});
};
