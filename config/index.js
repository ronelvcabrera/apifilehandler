const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	port: process.env.PORT,
	uploadFileDir: process.env.UPLOAD_FILE_DESTINATION,
	apiSecret: process.env.API_SECRET
}