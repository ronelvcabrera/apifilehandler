const mongoose = require('mongoose')
const moment = require('moment')


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
	publicKey: {
		type: String
	},
	privateKey: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	deleted: {
		type: Date,
		default: null
	}
})

module.exports = mongoose.model('UploadManager', UploadManagerScheme)