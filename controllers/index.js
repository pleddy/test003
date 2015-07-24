User = require('../models/user').User

module.exports = {

  index: function(req, res) {
    stories = {}
    sess = req.session;
    user = null

    console.log('action: home page')
    res.render('index');
  },

  login: function(req, res) {
    sess = req.session;

    console.log('action: login ' + req.body.email)
    User.findOne(
      { 'email': req.body.email },
      function(err, user) {
        if (err) {
          sess.status = 'User had errors'
          res.redirect('/')
        }
        if ( !user ) {
          newUser = new User({ email: req.body.email })
          console.log('newUser: ' + newUser)
          newUser.save(
            function(err,user) {
              if (err) throw err 
              sess.user_id = user.id
              sess.email = user.email
              console.log(sess.email)
              res.redirect('/stories/list')
            }
          )
        } else {
          sess.user_id = user.id
          sess.email = user.email
          res.redirect('/stories/list')
        }
      }
    )
  },

  logout: function(req, res) {
    sess = req.session;
    console.log('action: logout')
    sess.user_id = null
    sess.email = null
    res.redirect('/')
  }

}





