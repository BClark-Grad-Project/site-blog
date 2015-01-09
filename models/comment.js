var mongo  = require('mongoose');

var CommentSchema = mongo.Schema({
    blog:       {type:  mongo.Schema.Types.ObjectId,
                 ref:   'Blog'},
    commenter:  {type: String, required: true},
    comment:    {type: String, required: true},
    written:    {type: Date,  default: Date.now},
    active:     {type: String, default: true}
});

CommentSchema.methods.getData = function(){
	return {
	  id:        this._id,
	  commenter: this.commenter,
	  comment:   this.comment,
	  written:   this.written,
	  active:    this.active
	};
};

CommentSchema.methods.getBlog = function(){
	return {
	  id:        this._id,
	  blog:      this.blog
	};
};

module.exports = mongo.model('Comment', CommentSchema);
