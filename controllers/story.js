Story = require('../models/story').Story
User = require('../models/user').User
storyService = require('../services/story-service')
_ = require("underscore");

module.exports = {

  list: function(req, res) {
    console.log('user_id: ' + sess.user_id)
    Story.find(
      { _creator: sess.user_id },
      function(err, stories) {
        if (err) {
          return res.render('stories/list')
        }
        vm = {
          stories: stories
        }
        res.render('stories/list', { vm: vm });
      }
    )
  },

  new: function(req, res) {
    vm = { sess: sess }
    res.render('stories/new', vm);
  },

  view: function(req, res) {
    Story.findOne({ _id: req.params.id }, function(err, story) {
      if (err) {
        return res.redirect('/stories/list'); 
      }
      vm = {
        words: parse_words(story.content),
        story: story
      }
      res.render('stories/view', { vm: vm })
      console.log("Words: " + words)
    })
  },

  remove: function(req, res) {
    storyService.removeStory(req.params.id, function(err) {
      if (err) {
        return res.redirect('/stories/list'); 
      }
      res.redirect('/stories/list'); 
    })
  },

  add: function(req, res) {
    story = {}
    story.title = req.body.title
    story.content = req.body.content
    story.creator_id = req.body.user_id
    storyService.addStory(story, function(err) {
      if (err) {
        return res.redirect('/stories/list')
      }
      res.redirect('/stories/list') 
    })
  }
}

function parse_words(my_string) { 
  my_string = my_string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\'\"?¿]/g,'')
  my_string = my_string.toLowerCase()
  words = my_string.split(/[\s,]+/)
  words = words.sort()
  words = _.uniq(words)
  words = words.filter(function(str) { return str.length >= 4; });
  return words
}


