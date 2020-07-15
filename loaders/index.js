const expressLoader = require('./express')
const multerLoader = require('./multer')
const mongooseLoader = require('./mongoose')

module.exports = async ({ expressApp, multer, mongoose, config }) => {
	await expressLoader({ app: expressApp })
	console.log('Express initialized')
	const upload = await multerLoader(multer)
	console.log('Multer initialized')
	await mongooseLoader({ mongoose, config })
	console.log('Mongoose initialized')
	return {
		upload
	}
}