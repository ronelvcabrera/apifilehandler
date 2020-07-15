const mongoose = require('mongoose')

const UploadConfigScheme = mongoose.Schema({
	uploadLimit: {
		type: Number
	},
	downloadLimit: {
		type: Number
	},
	ipRestriction: {
		type: Array,
		default: () => []
	}
})

module.exports = mongoose.model('UploadConfig', UploadConfigScheme)