var express = require('express');
var router = express.Router();
var controller_story = require('../controllers/story.js')

router.get('/new', controller_story.new );
router.get('/list', controller_story.list );
router.post('/add', controller_story.add );
router.get('/remove/:id', controller_story.remove );
router.get('/view/:id', controller_story.view );

module.exports = router;
