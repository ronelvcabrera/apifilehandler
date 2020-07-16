/**
 * Middleware for limiting number of uploads in a day
 */
const moment = require('moment')

const UploadConfig = require('../models/UploadConfig')
const UploadManager = require('../models/UploadManager')

const CustomException = require('../exceptions/CustomException')

module.exports = async (req, res, next) => {
	try {
		let uploadConfig = await UploadConfig.find({})
		uploadConfig = uploadConfig[0]
		let upLimit = uploadConfig.uploadLimit
		const today = moment().startOf('day')
		let uploaded = await UploadManager.find({
			date: {
                '$gte': today.toDate(),
                '$lt': moment(today).endOf('day').toDate()
			}
		})
		if (upLimit < uploaded.length) {
			throw new CustomException(403, `Upload limit exceeded: limit ${upLimit}`)
		}
	} catch (err) {
		const statusCode = err.statusCode ? err.statusCode:500
		res.status(statusCode).json({ 
			success: 0,
			err: err.message
		})
	}
	next()
}