const { Storage } = require('@google-cloud/storage')
const path = require('path')

const { google } = require('../config')

const gc = new Storage({
	keyFilename: path.join(__dirname, '../google-cloud-account.json'),
	projectId: google.projectId
})

module.exports = async () => {
	return gc.bucket(google.bucket)
}