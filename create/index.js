var Blog = require('./blog');
var Comment= require('./comment');
var aws = require('aws-sdk');
aws.config.loadFromPath('./AwsConfig.json');

function noParamsGiven() {
  showUsage();
  process.exit(-1);
}


function showUsage() {
  console.log('Use choosing one of these command line parameters:');
  console.log('  audio folderName');
  console.log('  code');
  console.log('  createBucket');
  console.log('  css');
  console.log('  index');
  console.log('  images');
  console.log('  list');
}

var BUCKET_NAME = 'blog.cover';
var s3 = new aws.S3();

function createBucket(bucketName) {
  s3.createBucket({Bucket: bucketName}, function() {
    console.log('created the bucket[' + bucketName + ']');
  });
} 

function getContentTypeByFile(fileName) {
  var rc = 'application/octet-stream';
  var fn = fileName.toLowerCase();

  if (fn.indexOf('.html') >= 0) rc = 'text/html';
  else if (fn.indexOf('.css') >= 0) rc = 'text/css';
  else if (fn.indexOf('.json') >= 0) rc = 'application/json';
  else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
  else if (fn.indexOf('.png') >= 0) rc = 'image/png';
  else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';

  return rc;
}

function uploadFile(remoteFilename, fileName) {
  var fileBuffer = fs.readFileSync(fileName);
  var metaData = getContentTypeByFile(fileName);
  
  s3.putObject({
    ACL: 'public-read',
    Bucket: BUCKET_NAME,
    Key: remoteFilename,
    Body: fileBuffer,
    ContentType: metaData
  }, function(error, response) {
    console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
    console.log(err, response);
  });
}

module.exports.blog    = Blog;
module.exports.comment = Comment;

module.exports = function(blogObj, cb){
	if(blogObj.article){
    if(blogObj.article.image){
    	uploadFile('test.jpshg', blogObj.artile.image);
    }
	// Create Blog Article
	Blog(blogObj, function(err, blog){
		if(err){return cb(err, null);}
		return cb(null, blog);
	});
	} else if(blogObj.comment){
		// Add Comment to Blog
		var blog = {id:blogObj.comment.blog};
		Comment(blogObj, function(err, comment){
			if(err){return cb(err, null);}
			blog.comment = comment;
			return cb(null, blog);
		});
	} else {
		return cb('!No CREATE Item', null);
	}
};
