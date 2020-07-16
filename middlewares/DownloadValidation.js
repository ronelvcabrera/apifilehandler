/**
 * Middleware for limiting number of Downloads in a day
 */
const moment = require('moment')

const UploadConfig = require('../models/UploadConfig')
const DownloadLog = require('../models/DownloadLog')

const CustomException = require('../exceptions/CustomException')

module.exports = async (req, res, next) => {
	try {
		let uploadConfig = await UploadConfig.find({})
		uploadConfig = uploadConfig[0]
		let downLimit = uploadConfig.downloadLimit
		const today = moment().startOf('day')
		let downloaded = await DownloadLog.find({
			date: {
                '$gte': today.toDate(),
                '$lt': moment(today).endOf('day').toDate()
			}
		})
		if (downLimit < downloaded.length) {
			throw new CustomException(403, `Download limit exceeded: limit ${downLimit}`)
		}
    	next();
	} catch (err) {
		const statusCode = err.statusCode ? err.statusCode:500
		res.status(statusCode).json({ 
			success: 0,
			err: err.message
		})
	}
};