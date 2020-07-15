
const express = require('express');

const FileService = require('../services/FileService')
const config = require('../config')

const router = express.Router();

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
			res.status(200).json({ 
				success: 1,
				data
			})
		} catch (err) {
			res.status(500).json({ 
				success: 0,
				err: err
			})
		}
	})
	.post(async (req, res, next) => {
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

router.route('/:publicKey')
	.get(async (req, res, next) => {
		/**
		 * Download file
		 */
		const { publicKey } = req.params
		try {
			let fileName = await FileService.download(publicKey)
			res.download(`${config.fileUpload.dir}/${fileName}`)
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