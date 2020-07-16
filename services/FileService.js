const multer = require('multer')
const mongoose = require('mongoose')
const fs = require('fs')
const md5 = require('md5');

const multerLoader = require('../loaders/multer')
const googleCloudLoader = require('../loaders/googleCloud')
const UploadManager = require('../models/UploadManager')
const CustomException = require('../exceptions/CustomException')
const { fileUpload, apiSecret, provider } = require('../config')

const upload = multerLoader(multer)
const bucket = googleCloudLoader()

const defaultColumns = ['fileName', 'fileSize', 'fileSize', 'publicKey', 'privateKey', 'date']

module.exports = {
	getFiles: async (offset, limit, fields) => {
		/**
		 * Retrieve File manager data
		 */
		fields = fields ? fields:defaultColumns
		try {
			const uploads = await UploadManager.find( { deleted: null} )
				.select(fields)
				.skip(offset)
				.limit(limit)
			return formatFileManager(uploads)
		} catch (err) {
			throw new CustomException(500, 'Error Occurred on retrieving data')
		}
	},
	uploadFile: async (req, res) => {
		/**
		 * Uploading file and adding to database
		 */
		return new Promise((resolve, reject) => {
			upload(req, res, async (err) => {
				if (err) {
					reject(new CustomException(400, `${err.message}: limit is ${fileUpload.limit} B`))
				} else {
					let publicKey = md5(`${Date.now()}`)
					let privateKey = md5(`${apiSecret}${Date.now()}`)
					let currentFile = new UploadManager({
						fileName: req.file.filename,
						fileSize: req.file.size,
						publicKey,
						privateKey,
						originalFileName: req.file.originalname
					})
					try {
						await currentFile.save()
						resolve({ publicKey, privateKey })
					} catch (err) {
						reject(err)
					}

				}
			})
		});
	},
	download: async (publicKey) => {
		/**
		 * Download file
		 */
		try {
			const uploads = await UploadManager.find({ publicKey }).exec()
			if (!uploads.length) {
				throw new CustomException(404, 'File not found')
			}
			return uploads[0]
		} catch (err) {
			if (err instanceof mongoose.Error.CastError) {
				throw new CustomException(404, 'File not found')	
			}
			throw new CustomException(500, 'Error Occurred on retrieving data')
		}
		
	},
	deleteFile: async (privateKey, hard=0) => {
		/**
		 * Delete file
		 * by default, delete function will be a soft delete.
		 * hard parameter will trigger a hard delete to delete data and file.
		 */
		if (!hard) {
			try {
				const res = await UploadManager.updateOne({ privateKey }, { deleted: Date.now() });
				if (!res.n) {
					throw new CustomException(404, 'File not found')	
				}
				return res.n
			} catch (err) {
				throw new CustomException(500, 'Error Occurred: unable to delete data 1')
			}
		} else {
			var uploadfile = null
			try {
				// retrieve data first
				uploadfile = await UploadManager.find({ privateKey }).exec()
				if (!uploadfile.length) {
					throw new CustomException(404, 'File not found')
				}
				uploadfile = uploadfile[0]
				// Delete at database
				await UploadManager.deleteOne({ privateKey });
			} catch (err) {
				if (err instanceof mongoose.Error.CastError) {
					throw new CustomException(404, 'File not found')	
				}
				throw new CustomException(500, 'Error Occurred: unable to delete data')
			}
			const path = `${fileUpload.dir}/${uploadfile.fileName}`
			if (!fs.existsSync(path)) {
				throw new CustomException(404, 'File not found in directory')
			}
			try {
				// Delete file
				fs.unlinkSync(path)
			} catch (err) {
				throw new CustomException(500, 'Error Occurred: unable to delete file in directory')
			}
		}
	}
}


function formatFileManager(data) {
	/**
	 * Adding download and upload details
	 */
	data = JSON.parse(JSON.stringify(data))
	return data.map((dat) => {
		dat['downloadURL'] = {
			url: `/api/file/${dat.publicKey}`,
			method: 'GET'
		}
		dat['deleteURL'] = {
			url: `/api/file/${dat.privateKey}`,
			method: 'DELETE'
		}
		return dat
	})
}