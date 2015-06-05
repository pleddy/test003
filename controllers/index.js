StoryModel = require('../models/story')
UserModel = require('../models/user')
express = require('express')

module.exports = {
  index: function(req, res) {
    stories = {}
    sess = req.session;
    user = null

    console.log('===============================================================================')
    console.log("Session: %j", sess)
    console.log(req.body)

    if ( req.body.submit == 'logout' ) {
      console.log('action: logout')
      sess.user_id = null
      sess.email = null
      res.render('index', {})
    } else if ( req.body.submit == 'login' && req.body.email ) {
      console.log('action: login')
      query = UserModel
        .findOne({ 'email': req.body.email })
        .exec(
          function(err, user) {
            if ( !user ) {
              newUser = new UserModel({ email: req.body.email })
              newUser.save(
                function(err,user) {
                  if (err) throw err 
                  sess.user_id = user.id
                  sess.email = user.email
                  res.render('index', {})
                }
              )
            } else {
                if (err) throw err
                sess.user_id = user.id
                sess.email = user.email
                query = UserModel
                  .findOne({ _id: sess.user_id })
                  .populate('stories')
                  .exec(
                    function(err, user) {
                      if (err) return handleError(err)
                      console.log(user)
                      res.render('index', { sess: sess, stories: user.stories });
                    }
                  )
            }
          }
        )
    } else if ( req.body.story && sess.user_id ) {
      console.log('action: add story')
      query = UserModel
        .findOne({ _id: sess.user_id })
        .exec(
          function(err, user) {
            newStory = new StoryModel({ title: req.body.title, content: req.body.story, _creator: user.id })
            console.log("User: %j", user)
            newStory.save(
              function(err, story) { 
                if (err) { throw err }
                user.stories.push(story)
                user.save( 
                  function(err){
                    if (err) { throw err }
                    query = UserModel
                      .findOne({ _id: sess.user_id })
                      .populate('stories')
                      .exec(
                        function(err, user) {
                          if (err) return handleError(err)
                          console.log(user)
                          res.render('index', { sess: sess, stories: user.stories });
                        }
                      )
                  } 
                )
              }
            )
          }
        )
    } else if ( sess.user_id ) {
      console.log('action: show existing stories only')
      query = UserModel
        .findOne({ _id: sess.user_id })
        .populate('stories')
        .exec(
          function(err, user) {
            if (err) return handleError(err)
            console.log(user)
            res.render('index', { sess: sess, stories: user.stories });
          }
        )
    } else {
      console.log('action: none')
      res.render('index', { stories: stories, sess: sess });
    }
  }
}

