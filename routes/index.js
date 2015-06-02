var express = require('express');
var router = express.Router();
var controller_home = require('../controllers/index.js')

router.get('/', controller_home.index );
router.post('/', controller_home.index );
router.get('/:id', controller_home.index );

module.exports = router;
