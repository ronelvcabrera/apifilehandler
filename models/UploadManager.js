const mongoose = require('mongoose')

const UploadManagerScheme = mongoose.Schema({
	fileName: {
		type: String
	},
	fileSize: {
		type: Number
	},
	originalFileName: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	deleted: {
		type: Date
	}
})

module.exports = mongoose.model('UploadManager', UploadManagerScheme)