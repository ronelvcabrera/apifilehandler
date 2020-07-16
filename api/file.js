
const express = require('express');
const router = express.Router();

const FileService = require('../services/FileService')
const DownloadLogService = require('../services/DownloadLogService')

const uploadValidation = require('../middlewares/UploadValidation')
const downloadValidation = require('../middlewares/DownloadValidation')

const config = require('../config')

router.route('/')
	.get(async (req, res, next) => {
		/**
		 * Retrieve all files uploaded
		 */
		let { offset, limit, fields } = req.query
		offset = parseInt(offset)
		limit = parseInt(limit)
		limit = Math.min(limit, 200)
		fields = fields ? fields.split(',') : undefined
		try {
			const data = await FileService.getFiles(offset, limit, fields)
			console.log('data.length', data.length)
			res.status(200).json({ 
				success: 1,
				data
			})
		} catch (err) {
			console.log(err)
			const statusCode = err.statusCode ? err.statusCode:500
			res.status(statusCode).json({ 
				success: 0,
				err: err.message
			})
		}
	})
	

router.post('/', uploadValidation, async (req, res, next) => {
		/**
		 * Upload a file
		 */
		try {
			let data = await FileService.uploadFile(req, res)
			res.status(200).json({
				success: 1,
				data
			})
		} catch (err) {
			const statusCode = err.statusCode ? err.statusCode:500
			res.status(statusCode).json({ 
				success: 0,
				err: err.message
			})
		}
	});

router.get('/:publicKey', downloadValidation, async (req, res, next) => {
		/**
		 * Download file
		 */
		const { publicKey } = req.params
		try {
			let uploadManager = await FileService.download(publicKey)
			await DownloadLogService.logDownload(uploadManager._id)
			res.download(`${config.fileUpload.dir}/${uploadManager.fileName}`)
		} catch (err) {
			const statusCode = err.statusCode ? err.statusCode:500
			res.status(statusCode).json({ 
				success: 0,
				err: err.message
			})
		}
	});

router.route('/:privateKey')
	.delete(async (req, res, next) => {
		/**
		 * Delete File
		 */
		let { hard } = req.query
		const { privateKey } = req.params
		try {
			await FileService.deleteFile(privateKey, hard)
			res.status(200).json({
				success: 1,
				message: 'File successfully deleted.'
			})
		} catch (err) {
			const statusCode = err.statusCode ? err.statusCode:500
			res.status(statusCode).json({ 
				success: 0,
				err: err.message
			})
		}
	});

module.exports = router;