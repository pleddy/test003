var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema ({
    content: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema);
