const mongoose = require('mongoose')

const DownloadLogScheme = mongoose.Schema({
	uploadManagerName: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('DownloadLog', DownloadLogScheme)