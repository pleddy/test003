var myexpress = require('express');
var myrouter = myexpress.Router();
var controller_home = require('../controllers/index.js')

myrouter.get('/', controller_home.index );
myrouter.post('/', controller_home.index );
myrouter.get('/:id', controller_home.index );

module.exports = myrouter;
