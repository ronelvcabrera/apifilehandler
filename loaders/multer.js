const config = require('../config')

module.exports = (multer) => {
	const storage = multer.diskStorage({
		destination: config.uploadFileDir,
		filename: function(req, file, cb){
			cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
	});
	const upload = multer({
		storage: storage,
		limits:{fileSize: 1000000},
		fileFilter: function(req, file, cb){
			checkFileType(file, cb);
		}
	}).single('myImage');
	
	return upload
}