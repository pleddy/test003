var express = require('express');
var router = express.Router();
var controller_home = require('../controllers/index.js')

router.get('/', controller_home.index );
router.post('/', controller_home.index );
router.post('/logout', controller_home.logout );
router.post('/login', controller_home.login );

module.exports = router;
