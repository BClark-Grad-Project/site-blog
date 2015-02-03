var Blog = require('./../config').blog;

module.exports = function(blogObj, cb){
    if(!blogObj.author){ return cb('!No Blog Author', null);}
    if(!blogObj.type){   return cb('!No Blog Type',   null);}
    if(!blogObj.article.title){
    	return cb('!No Blog Title', null);
    }
    if(!blogObj.article.description){
    	return cb('!No Blog Description', null);
    }

    var author      = blogObj.author;
    var type        = blogObj.type;
    var title       = blogObj.article.title;
    var description = blogObj.article.description;
    var tags        = blogObj.tags             ? blogObj.tags    : undefined;
    var image       = blogObj.article.image   ? blogObj.article.image   : undefined;
  	var edit        = blogObj.edit             ? blogObj.edit    : undefined;
    var written     = blogObj.written          ? blogObj.written : new Date();
    var visits      = blogObj.notice.visits    ? blogObj.notice.visits    : 0;
    var favorites   = blogObj.notice.favorites ? blogObj.notice.favorites : 0;
    
    // If blog is being updated
    if(blogObj.edit){
	  	var lastEdit    = blogObj.edit.id ? blogObj.edit.id : undefined; 
	  	edit.last       = blogObj.id      ? new Date()      : undefined;
	  	if(lastEdit){  		
	  		edit.id     = lastEdit;
	  	} else {
	  		edit.id     = blogObj.id      ? blogObj.id      : undefined;
	  	}
    }
	var blog = new Blog({
	    author:      author,
	    type:        type,
	    title:       title,
	    description: description,
	    tags:        tags,
	    image:       image,
	    written:     written,
	    visits:      visits,
	    favorites:   favorites,
	    edit:        edit
	});	
	
	blog.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, blog.getData());
    });
};