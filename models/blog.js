var mongo  = require('mongoose');

var BlogSchema = mongo.Schema({
    author:      {type: String,  required: true},
    type:        {type: String,  required: true},
    title:       {type: String,  lowercase: true, required: true, sparse: true, unique:true},
    description: {type: String,  lowercase: true, required: true, sparse: true, unique:true},
    tags:        {type: String},
    image:       {type: String},
    written:     {type: Date},
    edit:        {last: {type:   Date},
    	          id:   {type:   mongo.Schema.Types.ObjectId,
                         ref:    'Blog'}},
    active:      {type: Boolean, default: true}
});

BlogSchema.methods.getData = function(){
	return {
  	  id:            this._id,
	  author:        this.author,
	  type:          this.type,
	  written:       this.written,
	  edit:          this.edit,
      tags:          this.tags,
	  article:{
	    title:       this.title,
	    description: this.description,
	    image:       this.image,
	    active:      this.active}
	};
};

module.exports = mongo.model('Blog', BlogSchema);
