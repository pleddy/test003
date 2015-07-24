User = require('../models/user').User
userService = require('../services/user-service')

module.exports = {

  index: function(req, res) {
    stories = {}
    sess = req.session;
    user = null

    console.log('action: home page')
    sess.message = ''
    res.render('index');
  },

  login: function(req, res) {
    sess = req.session;

    if (!req.body.email) {
      return res.redirect('/');
    }

    User.findOne(
      { 'email': req.body.email },
      function(err, user) {
        if (err) {
          sess.message = 'Finding user had errors'
          return res.redirect('/')
        }
        if ( !user ) {
          userService.addUser(req.body, function(err, user) {
            if (err) {
              return res.redirect('/stories/list')
            }
            sess.user_id = user.id
            sess.email = user.email
            sess.save()
            return res.redirect('/stories/list')
          })
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
//    sess.user_id = null
//    sess.email = null
    req.session.destroy();
    res.redirect('/')
  }

}





