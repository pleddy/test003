var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    email: String,
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]
});

module.exports = mongoose.model('User', UserSchema);
