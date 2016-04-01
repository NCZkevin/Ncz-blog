var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	date : String,
	post : String,
	tags : String
});
mongoose.model('Post',PostSchema);
