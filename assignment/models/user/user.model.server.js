/**
 * Created by Vinay on 11/16/2016.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var model = {};
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllWebsitesForUser: findAllWebsitesForUser,
        removeUser: removeUser,
        removeWebsiteFromUser : removeWebsiteFromUser,
        setModel: setModel
    }
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function findAllWebsitesForUser(userId) {
        return UserModel.findById(userId)
            .populate("websites")
            .exec();
    }

    function createUser(user) {
        console.log(user);
        return UserModel.create(user);
    }
    
    function  findUserById(userId) {
        return UserModel.findById(userId);
    }
    
    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        })
    }
    
    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email

                }
            );
        
    }

    function findUserByCredentials(username, password) {

        return UserModel.findOne({
            username: username,
            password: password
        });

    }

    function removeUser(userId) {
        return UserModel
            .remove({
                _id: userId
            });

    }
    
    function  removeWebsiteFromUser(userId, websiteId) {
        return UserModel.findById(userId)
            .then(function (userObj) {
                var userWebsites = userObj.websites;
                for(var i = 0; i < userWebsites.length; i++)
                {
                    if(userWebsites[i] == websiteId)
                        userWebsites.splice(i,1);
                }
                userObj.websites = userWebsites;
                return userObj.save();
            })
    }
    
    

};
