mongoose = require('mongoose')
Schema = mongoose.Schema

storySchema = new Schema ({
  _creator : { type: Schema.Types.ObjectId },
  title : String,
  content : String,
})

Story = mongoose.model('Story', storySchema)

module.exports = {
  Story: Story
}
