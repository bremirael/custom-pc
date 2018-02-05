var User = require('../models/user.js');
var bcrypt = require('bcrypt');
var saltLevel = 10;

module.exports = function(req, res) {
    var hash = bcrypt.hashSync(req.body.password, saltLevel);
    var user = User.create({
            username: req.body.username,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname
    }).then(() => {
        res.redirect('/login');
    }).catch(function(error){
        console.error(error);
    });
}