StoryModel = require('../models/story')
UserModel = require('../models/user')

module.exports = {
  newstory: function(req, res) {
    stories = {}
    sess = req.session;
    user = null

//    console.log('===============================================================================')
//    console.log("Session: %j", sess)
//    console.log(req.body)

    if ( sess.user_id ) {                            // show story 
      console.log('action: show new story form')
      query = UserModel
        .findOne({ _id: sess.user_id })
        .populate('stories')
        .exec(
          function(err, user) {
            if (err) return handleError(err)
            console.log(user)
            res.render('newstory', { sess: sess, stories: user.stories, current_id: req.params.id });
          }
        )
    } else {
      console.log('action: none')
      res.render('index', {});
    }
  }
}




