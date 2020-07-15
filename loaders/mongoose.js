const config = require('../config')
const UploadConfig = require('../models/UploadConfig')

module.exports = ({ mongoose, config }) => {
	mongoose.connect(
		config.dbConnect,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		},
		async () => {
			console.log('Connected to DB')
			// Check config
			let configCount = await UploadConfig.estimatedDocumentCount({})
			if (configCount == 0) {
				console.log('Creating App Config')
				// if not exist. Create config
				let uploadConfig = new UploadConfig({
					uploadLimit: 5,
					downloadLimit: 5,
					ipRestriction: []
				})
				try {
					await uploadConfig.save()
				} catch (err) {
					throw new Exception('Unable to create App Config')
				}
			}
		}
	)
}