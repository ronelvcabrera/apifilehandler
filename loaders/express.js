const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = async ({ app }) => {
	app.use(cors())
	app.use(bodyParser.json())
	// app.use(function(req, res, next) {
	// 	console.log('ERROR OCCURED')
	// 	var err = new Error('Not Found');
	// 	err.status = 404;
	// 	// res.json({ a: 1 })
	// 	// res.end(JSON.stringify({ a: 1 }));
	// });

	// app.use(function(req, res, next) {
	// 	var err = new Error('Not Found');
	// 	err.status = 404;
	// 	next(err);
	// });


	return app
}