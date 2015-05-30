var StoryModel = require('../models/story.js');

module.exports = {
    index: function(req, res) {
        myid = req.params.id
        mystory = req.body.story
        hasstory = ( mystory ) ? true : false;
        if (mystory) {
            var newStory = new StoryModel({ content: mystory });
            newStory.save(
                function(err, story) {
                    StoryModel
                        .find({})
                        .sort('-timestamp')
                        .exec(
                                function(err, stories) {
                                    if (err) { throw err; }

                                     res.render('index', { title: 'Express', stories: stories, story: mystory, hasstory: hasstory, myid: myid });
                                }
                        );
                }
            );
        } else {
            StoryModel
                .find({})
                .sort('-timestamp')
                .exec(
                        function(err, stories) {
                            if (err) { throw err; }

                             res.render('index', { title: 'Express', stories: stories, story: mystory, hasstory: hasstory, myid: myid });
                        }
                );
        }
    }
}
