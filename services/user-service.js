User = require('../models/user').User

exports.addUser = function(user, next) {
  var newUser = new User({
    email: user.email
  })

  newUser.save(function(err, user) {
    if (err) return next(err, null) 
    next(null, user)
  })
}

exports.removeUser = function(id, next) {
  User.remove( {_id: id}, function(err) {
    if (err) return next(err)
    next(null)
  })
}

