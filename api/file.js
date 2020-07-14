
var express = require('express');
var router = express.Router();

router.route('/').get((req, res, next) => {
	/**
	 * Upload a file
	 */
	console.log('uplaoding file route')
	res.end(JSON.stringify({ a: 1 }));
});

// router.get('/:publicKey', function(req, res, next) {
// 	/**
// 	 * Download file
// 	 */
// 	console.log('Download file route', req.params)
// });

// router.delete('/:privateKey', function(req, res, next) {
// 	/**
// 	 * Delete File
// 	 */
// 	console.log('Delete file route', req.params)
// });

module.exports = router;