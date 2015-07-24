Story = require('../models/story').Story

exports.addStory = function(story, next) {
  var newStory = new Story({
    title: story.title, 
    content: story.content, 
    _creator: story.creator_id
  })

  newStory.save(function(err) {
    if (err) return next(err) 
    next(null)
  })
}

exports.removeStory = function(id, next) {
  Story.remove( {_id: id}, function(err) {
    if (err) return next(err)
    next(null)
  })
}

