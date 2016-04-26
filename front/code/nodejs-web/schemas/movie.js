var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	title:String
	// country:String,
	// year:Number,
	// mata:{
	// 	createAt:{
	// 		type:Date,
	// 		defalt:Date.now()
	// 	},
	// 	updateAt:{
	// 		type:Date,
	// 		defalt:Date.now()
	// 	},
	// }
})

MovieSchema.pre('save',function(next){
	// if(this.isNew){
	// 	this.meta.createAt = this.meta.updateAt = Date.now()
	// }else{
	// 	this.meta.updateAt = Date.now()
	// }

	next()

})

MovieSchema.statics = {
	fetch : function(cb){
		return this
		.find({})
		// .sort('meta.updateAt')
		.exec(cb)
	},
	findById : function(id, cb){
		return this
		.findOne({_id: id})
		.exec(cb)
	}
}

module.exports = MovieSchema























