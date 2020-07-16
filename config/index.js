const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	port: process.env.PORT,
	provider: process.env.PROVIDER,
	apiSecret: process.env.API_SECRET,
	fileUpload: {
		dir: process.env.UPLOAD_FILE_DESTINATION,
		limit: process.env.UPLOAD_FILE_LIMIT
	},
	dbConnect: process.env.MONGO_DB,
	google: {
		apiKey: process.env.GOOGLE_COULD_API_KEY,
		bucket: process.env.GOOGLE_BUCKET_NAME,
		projectId: process.env.GOOGLE_PROJECT_ID
	}
}