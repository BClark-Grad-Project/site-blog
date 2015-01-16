var mongo  = require('mongoose');

var CommentSchema = mongo.Schema({
    blog:       {type:  mongo.Schema.Types.ObjectId,
                 ref:   'Blog'},
    author:     {type: String, required: true},
    description:{type: String, required: true},
    written:    {type: Date},
    active:     {type: String, default: true}
});

CommentSchema.methods.getData = function(){
	return {
	  id:          this._id,
	  author:      this.author,
	  description: this.description,
	  written:     this.written,
	  active:      this.active
	};
};

module.exports = mongo.model('Comment', CommentSchema);
