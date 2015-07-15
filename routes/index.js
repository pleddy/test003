var express = require('express');
var router = express.Router();
var controller_home = require('../controllers/index.js')
var controller_story = require('../controllers/newstory.js')

router.get('/', controller_home.index );
router.post('/', controller_home.index );
router.get('/:id', controller_home.index );
router.get('/stories/new', controller_story.newstory );

module.exports = router;
