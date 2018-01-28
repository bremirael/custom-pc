var User = require('../models/user.js');
var admin = require('./admin.js');


//Partie Publique

module.exports.profile = function(req,res){
    if(typeof req.cookies.user == 'undefined') {
        res.redirect('/login');
    }
    else{
        if(req.cookies.user.username == "admin"){
            res.redirect('/admin');
        }
        else{
            res.render('profile',{user:req.cookies.user});
        }
    }
}

//Partie Admin
module.exports.editList = function(req,res){
    admin.checkAdminRights(req,res);
    var users = User.findAndCountAll()
        .then(result => {
        res.render('editListUser',{users: result.rows, nbUsers: result.count});
}).catch(function(error){
        console.error(error);
    });
}
module.exports.delete = function(req, res){
    admin.checkAdminRights(req,res);
    var user = User.findOne({
        where:
            {
                id_user: req.params.id
            }
    }).then(function(result){
        result.destroy().then(()=>{
            res.redirect('/admin/user');
    }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.displayEditInfo = function(req, res){
    admin.checkAdminRights(req,res);
    var user = User.findOne({
        where:
            {
                id_user: req.params.id
            }
    }).then(function(result) {
        res.render('editUserAdmin',{user: result});
    }).catch(function(error){
        console.error(error);
    });
}

module.exports.edit = function(req, res){
    admin.checkAdminRights(req,res);
    var user = User.findOne({
        where:
            {
                id_user: req.params.id
            }
    }).then(function(result){
        result.update(
            {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
        ).then(()=>{
            res.redirect('/admin/user');
    }).catch(function(error){
            console.error(error);
        });
    }).catch(function(error){
        console.error(error);
    });
}