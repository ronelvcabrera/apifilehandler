const express = require('express')
const multer = require('multer')

const loaders = require('./loaders')
const config = require('./config')
const fileRoutes = require('./api/file')

const app = express()

async function startServer() {
	let { upload } = await loaders({ expressApp: app, multer })
	// app.get('/api/files', (req, res, next) => {
	// 	req['upload'] = upload
	// }, fileRoutes)
	app.use('/api/file', fileRoutes)
	app.get('/', (req, res, next) => {

	})
	app.listen(config.port, err => {
		if (err) {
			console.log(err)
			return
		}
		console.log(`App is running on ${config.port}`)
	})
}
startServer();