const config = require('../config')

module.exports = ({ mongoose, config }) => {
	mongoose.connect(
		config.dbConnect,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		},
		() => {
			console.log('Connected to DB')
		}
	)
}