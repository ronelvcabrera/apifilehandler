const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	port: process.env.PORT,
	apiSecret: process.env.API_SECRET,
	fileUpload: {
		dir: process.env.UPLOAD_FILE_DESTINATION,
		limit: process.env.UPLOAD_FILE_LIMIT
	},
	dbConnect: process.env.MONGO_DB
}