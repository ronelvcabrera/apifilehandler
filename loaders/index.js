const expressLoader = require('./express')
const multerLoader = require('./multer')

module.exports = async ({ expressApp, multer }) => {
	await expressLoader({ app: expressApp })
	console.log('Express initialized')
	const upload = await multerLoader(multer)
	console.log('Multer initialized')
	return {
		upload
	}
}