const mongoose = require('mongoose')

const DownloadLog = require('../models/DownloadLog')
const CustomException = require('../exceptions/CustomException')

module.exports = {
	logDownload: async (managerName) => {
		/**
		 * Log the downloaded file
		 */
		let downloadLog = new DownloadLog({
			uploadManagerName: managerName
		})
		try {
			await downloadLog.save()
		} catch(err) {
			throw new CustomException(500, 'Error Occurred: Unable to log download')
		}
	}
}