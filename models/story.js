var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema ({
  _creator : { type: Schema.Types.ObjectId, ref: 'User' },
  title : String,
  content : String,
  shares : [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Story', StorySchema);
