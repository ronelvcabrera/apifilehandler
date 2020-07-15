const { fileUpload } = require('../config')
const path = require('path')

module.exports = (multer) => {
	const storage = multer.diskStorage({
		destination: fileUpload.dir,
		filename: function(req, file, cb){
			cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		}
	});
	const upload = multer({
		storage: storage,
		limits:{fileSize: fileUpload.limit}
		// fileFilter: function(req, file, cb){
		// 	// checkFileType(file, cb);
		// }
	}).single('myFile');
	
	return upload
}