const { fileUpload } = require('../config')
const path = require('path')
const multerGoogleStorage = require("multer-google-storage");
const { google, provider } = require('../config')

module.exports = (multer) => {
	let storage = null
	if (provider == 'local') {
		storage = multer.diskStorage({
			destination: fileUpload.dir,
			filename: function(req, file, cb){
				cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
			}
		});
	} else if (provider == 'google') {
		storage = multerGoogleStorage.storageEngine({
			keyFilename: path.join(__dirname, '../google-cloud-account.json'),
			projectId: google.projectId,
			bucket: google.bucket,
			acl: 'publicRead'
		})
	}

	const upload = multer({
		storage: storage,
		limits: { fileSize: parseInt(fileUpload.limit) }
	}).single('myFile');
	
	return upload
}