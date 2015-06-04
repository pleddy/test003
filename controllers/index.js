var StoryModel = require('../models/story.js');
var express = require('express');

module.exports = {
  index: function(req, res) {
    var sess;
    var email;

    sess = req.session;
    console.log(sess);
    myid = req.params.id
    mystory = req.body.story
    hasstory = ( mystory ) ? true : false;

    sess = req.session;
    //  console.log(req.body);
    if ( req.body.submit == 'logout' ) {
      sess.email = null;
    } else if ( req.body.submit == 'login' && req.body.email ) {
      sess.email = req.body.email;
    }

    if (mystory) {
      var newStory = new StoryModel({ content: mystory });
      newStory.save(
        function(err, story) {
          StoryModel
            .find({})
            .exec(
              function(err, stories) {
                if (err) { throw err; }
                res.render('index', { title: 'Express', stories: stories, story: mystory, hasstory: hasstory, myid: myid, sess: sess });
              }
            );
          }
        );
    } else {
      sess = req.session;
      //console.log(sess);
      StoryModel
        .find({})
        .exec(
          function(err, stories) {
            if (err) { throw err; }
            res.render('index', { title: 'Express', stories: stories, story: mystory, hasstory: hasstory, myid: myid, sess: sess });
          }
        );
    }
  }
}

