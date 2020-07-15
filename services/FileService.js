const multer = require('multer')

const multerLoader = require('../loaders/multer')
const UploadManager = require('../models/UploadManager')

const upload = multerLoader(multer)

class FileService {
	uploadFile(req, res) {
		/**
		 * Uploading file and adding to database
		 */
		upload(req, res, (err) => {
			if (err) {
				res.end(JSON.stringify({ err }))
			} else {
				let currentFile = new UploadManager({
					fileName: req.file.filename,
					fileSize: req.file.size,
					originalFileName: req.file.originalname
				})
				currentFile.save()
					.then(data => {
						let returnData = {
							fileName: data.fileName,
							fileSize: data.fileSize,
							fileSize: data.fileSize,
							date: data.date,
							downloadURL: `/api/file/${data._id}`
						}
						res.end(JSON.stringify(returnData))
					})
					.catch(err => {
						res.end(JSON.stringify({ err }))
					})

			}
		})

	}
	download() {

	}
	delete() {

	}
	getAll() {

	}
}

module.exports = FileService