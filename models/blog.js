var mongo  = require('mongoose');

var BlogSchema = mongo.Schema({
    author:      {type: String,  required: true},
    type:        {type: String,  required: true},
    title:       {type: String,  lowercase: true, required: true, sparse: true, unique:true},
    description: {type: String,  lowercase: true, required: true, sparse: true, unique:true},
    tags:        {type: String},
    image:       {type: String},
    written:     {type: Date,    default: Date.now},
    edits:       {last:    {type: Date},
    	          history: {type: mongo.Schema.Types.ObjectId,
                            ref:  'Comment'}},
    active:      {type: Boolean, default: true}
});

BlogSchema.methods.getData = function(){
	return {
  	  id:            this._id,
	  author:        this.author,
	  type:          this.type,
	  active:        this.active,
	  article:{
	    title:       this.title,
	    description: this.description,
	    written:     this.written,
	    edited:      this.edits.last,
	    tags:        this.tags,
	    image:       this.image}
	};
};

BlogSchema.methods.getEdits = function(){
	return {
  	  id:            this._id,
	  edits:         this.edits.history
	};
};

module.exports = mongo.model('Blog', BlogSchema);
