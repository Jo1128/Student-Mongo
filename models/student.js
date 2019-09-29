var mongoose =require('mongoose');
var Schema = mongoose.Schema;


var studentSchema = new Schema({
	name: String,
	rollno:String,
	phonenumber:String,
	mark:String
})
module.exports =  mongoose.model('student',studentSchema);