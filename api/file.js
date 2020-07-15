
const express = require('express');

const FileService = require('../services/FileService')

const router = express.Router();

router.route('/')
	.get((req, res, next) => {
		/**
		 * Retrieve all files uploaded
		 */
		console.log('Retrieve all files uploaded')
		res.end(JSON.stringify({ a: 1 }));
	})
	.post(async (req, res, next) => {
		/**
		 * Upload a file
		 */
		console.log('FileService', FileService);
		let fileService =  new FileService()
		fileService.uploadFile(req, res)
	});

router.route('/:publicKey')
	.get((req, res, next) => {
		/**
		 * Download file
		 */
		console.log('Download file route', req.params)
	});

router.route('/:privateKey')
	.delete((req, res, next) => {
		/**
		 * Delete File
		 */
		console.log('Delete file route', req.params)
	});

module.exports = router;